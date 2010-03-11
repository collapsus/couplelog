function CoupleLog(couplelogCollection, data, currentUser) {
    this.data = data;
    this.current = '';
    if (data.he.user == currentUser) this.current = 'he';
    if (data.she.user == currentUser) this.current = 'she';
    this.currentData = data[this.current];
    this.makeDOM();
    this.setup = new Setup(this);
};

CoupleLog.prototype.makeHTML = function() {
    return ['<div class="couplelog">',
        '<h1>', this.data.title, '</h1>',
        '<div class="slide">',
            '<table cellpadding="0" cellspacing="0" width="100%">',
                this.makeRowHTML('he', 'Он'),
                '<tr class="gap"><td colspan="3"><i/></td></tr>',
                this.makeRowHTML('she', 'Она'),
            '</table>',
            this.makeFormHTML(),
        '</div>',
    '</div>'].join('');
};

CoupleLog.prototype.makeRowHTML = function(who, whoTitle){
    return [
        '<tr class="', who, '">',
            '<td class="title">',
                this.current == who ? 'Я' : whoTitle,
            '</td>',
            this.barsAndCountsHTML,
        '</tr>'].join('');
};

CoupleLog.prototype.barsAndCountsHTML = [
    '<td style="width: 100%">',
        '<div class="canvas-container"></div>',
    '</td>',
    '<td class="counts">',
        '<span class="count count-main"/>',
        '<span class="diff">, <span class="count count-diff"/></span>',
    '</td>'].join('');

CoupleLog.prototype.makeFormHTML = function(){
    if (!this.current) return '';
    var action = this.currentData.action,
        button = this.currentData.button,
        buttonHTML = '<input type="button" value="' + button + '"/>';
    return ['<form action="">',
            '<p class="action">',
                action.indexOf(button) > -1 ?
                    action.replace(button, buttonHTML) :
                    action + ' ' + buttonHTML,
            '</p>',
            '<p class="cancel">',
                '<input type="button" value="Отменить"/> последнюю запись.',
            '</p>',
        '</form>'].join('');
};

CoupleLog.prototype.makeDOM = function(html) {
    this.elem = $(this.makeHTML()).appendTo('body');
    var slideFirstCall = 0;
    var _this = this;
    $.each({
        he: '.he',
        she: '.she',
        heCanvasContainer: '.he .canvas-container',
        sheCanvasContainer: '.she .canvas-container',
        heCount: '.he .count-main',
        sheCount: '.she .count-main',
        diffCount: '.count-diff',
        actionButton: '.action :button',
        cancel: '.cancel',
        cancelButton: '.cancel :button',
        h1Title: 'h1',
        slide: '.slide'
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });
    this.heBar = new RaphBar(this.heCanvasContainer, 'blue');
    this.sheBar = new RaphBar(this.sheCanvasContainer, 'red');

    this.sync();

    this.actionButton.click(function(){
        $(this).attr('disabled', 'disabled').animate({disabled: ''}, 1000);

        _this.currentData.count++;
        _this.sync();

        _this.cancel.show();
        setTimeout(function(){ _this.cancel.fadeOut() }, 10000);
    });

    this.cancelButton.click(function(){
        _this.cancel.hide();
        _this.currentData.count--;
        _this.sync();
    });

    this.h1Title.click(function(){
        $("h1.active").removeClass("active");
        $(this).siblings(".slide").slideToggle("fast");
        $(this).toggleClass("active");
        $("h1:not('.active')").siblings(".slide").slideUp("fast");
        //вызывается перерисовка, потому как какойто глюк Рафаэля - если рисунок был невидим
        //(здесь в css выставлен display: none) то при после первого слайда он невидим
        _this.sync();
    });


    //перерисовка баров при изменении размеров окна
    $(window).resize(function(){
        _this.sync();
    });

};

CoupleLog.prototype.sync = function(){
    var isHeMax = this.data.he.count > this.data.she.count,
        counts = [this.data.he.count],
        relation = {
            forhe: '',
            forshe: ''
        },
        pair = {
            he: 'he',
            she: 'she'
        };
    counts[isHeMax ? 'unshift' : 'push'](this.data.she.count);

    if (isHeMax) {
        relation.forhe = 1, relation.forshe = (counts[0] / counts[1])
    } else {
        relation.forshe = 1, relation.forhe = (counts[0] / counts[1])
    };

    var diff = counts[1] - counts[0];
    this.he.toggleClass('in-min', !isHeMax).toggleClass('in-max', isHeMax);
    this.she.toggleClass('in-min', isHeMax).toggleClass('in-max', !isHeMax);
    //разделено на две отдельные функции (а не объединено в одну как было ранее) чтобы сначала пересчитывать
    //обе цифры, а только после этого перерисовывать оба бара
    this.recount(pair, diff);
    this.resize(pair, relation);
};

CoupleLog.prototype.recount = function(pair, diff){
    for (var who in pair) {
        this[who + 'Count'].text("" + this.data[who].count);
    };
    this.diffCount.text("" + diff);
};

CoupleLog.prototype.resize = function(pair, relation){
    for (var who in pair) {
        this[who + 'Bar'].paper.setSize($(this[who + 'CanvasContainer']).width(), 22);
        this[who + 'Bar'].background.attr({width: $(this[who + 'CanvasContainer']).width() - 2});
        this[who + 'Bar'].bar.attr("width", this[who + 'Bar'].background.getBBox().width * relation['for' + who] -2);
    };
};

CoupleLog.prototype.destroy = function(){
    $(this.elem).remove();
};

function RaphBar (elem, color) {
    this.elem = elem[0];
    this.paper = new Raphael(this.elem, $(this.elem).width(), 22);
    this.background = this.paper.rect(0, 0, $(this.elem).width()-2, 20);
    this.background.attr({fill: 'gray', stroke: 'black', 'stroke-width': 2});
    this.bar = this.paper.rect(1, 1, 0, 18);
    this.bar.attr({fill: color, stroke: 'none'});
};

