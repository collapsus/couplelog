function WdgtSetup(couplelogCollection){
    this.couplelogCollection = couplelogCollection;
    this.makeDOM();
}

WdgtSetup.prototype.makeHTML = function(){
    return [
        '<div class="wdgtsetup">',
            '<div class="b-widget__control">',
                '<a class="b-widget__control__setup" onclick="return false" href="#">',
                    '<i></i>',
                '</a>',
            '</div>',
            '<div class="infocircle"></div>',
            '<div class="info">Этот проэкт создан для...</div>',
            '<input type="button" value="Применить" class="setup-submit" />',
        '</div>'
    ].join('');
};

WdgtSetup.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).appendTo(this.couplelogCollection.body);
    var _this = this;
    $.each({
        setup: ".b-widget__control__setup",
        submit: ".setup-submit",
        info: ".info",
        infoCircleContainer: ".infocircle"
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.infoCircle = new RaphInfoCircle(this.infoCircleContainer, this.info);

    this.setup.click(function(){

        _this.couplelogCollection.destroy();
        _this.couplelogCollection.likeLogin.elem.show();
        _this.couplelogCollection.setMode('wdgt');
        _this.couplelogCollection.create();
        _this.couplelogCollection.body.css("background-color", "#dedefa");

        $(this).hide();

        _this.submit.show();
    });

    this.submit.click(function(){
        _this.couplelogCollection.destroy();
        _this.couplelogCollection.likeLogin.elem.hide();
        _this.couplelogCollection.setMode('cntnt');
        _this.couplelogCollection.create();
        _this.couplelogCollection.body.css("background-color", "");
        $(this).hide();

        _this.setup.show();
    });

};

function RaphInfoCircle(elem, info){
    this.elem = elem[0];
    this.info = info;
    this.paper = new Raphael(this.elem, 0, 0);
    this.background = this.paper.circle(10, 10, 8);
    this.background.attr({fill: 'gray'});
    this.text = this.paper.text(10, 10, "i");
    this.text.attr({fill: 'white', font: '12px Fontin-Sans, Arial'});

    var _this = this;

    onEvents(this.background);
    onEvents(this.text);

    function onEvents(obj){

        obj.click(function(event){
            _this.info.toggle();
        });

        obj.hover(function (event) {
            _this.background.attr({fill: "blue"});
            this[0].style.cursor = "pointer";
        }, function (event) {
            _this.background.attr({fill: "gray"});
        });
    }

}
