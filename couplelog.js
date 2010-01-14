    function CoupleLog(data, currentUser) {
        this.data = data;
        this.current = '';
        if (data.he.user == currentUser) this.current = 'he';
        if (data.she.user == currentUser) this.current = 'she';
        this.currentData = data[this.current];
        this.makeDOM();
    }

    CoupleLog.prototype.makeHTML = function() {
        return ['<div class="couplelog">',
            '<h1>', this.data.title, '</h1>',
            '<table cellpadding="0" cellspacing="0" width="100%">',
                this.makeRowHTML('he', 'Он'),
                '<tr class="gap"><td colspan="3"><i/></td></tr>',
                this.makeRowHTML('she', 'Она'),
            '</table>',
            this.makeFormHTML(),
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
            '<div class="bar bar-main">&#160;</div>',
            '<div class="bar bar-diff">&#160;</div>',
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
        var _this = this;
        $.each({
                he: '.he',
                she: '.she',
                bar: '.bar-main',
                barDiff: '.bar-diff',
                heCount: '.he .count-main',
                sheCount: '.she .count-main',
                diffCount: '.count-diff',
                actionButton: '.action :button',
                cancel: '.cancel',
                cancelButton: '.cancel :button'
            }, function(k, v){
                _this[k] = _this.elem.find(v);
            });
        this.syncCounts();

        this.actionButton.click(function(){
            $(this).attr('disabled', 'disabled').animate({disabled: ''}, 1000);

            _this.currentData.count++;
            _this.syncCounts();

            _this.cancel.show();
            setTimeout(function(){ _this.cancel.fadeOut() }, 10000);
        });

        this.cancelButton.click(function(){
            _this.cancel.hide();
            _this.currentData.count--;
            _this.syncCounts();
        });
    };

    CoupleLog.prototype.syncCounts = function() {
        var isHeMax = this.data.he.count > this.data.she.count,
            counts = [this.data.he.count];
        counts[isHeMax ? 'unshift' : 'push'](this.data.she.count);

        this.heCount.text(this.data.he.count);
        this.sheCount.text(this.data.she.count);
        this.diffCount.text(counts[1] - counts[0]);

        this.he.toggleClass('in-min', !isHeMax).toggleClass('in-max', isHeMax);
        this.she.toggleClass('in-min', isHeMax).toggleClass('in-max', !isHeMax);

        var barWidth = (counts[0] / counts[1]) * 100;
        this.bar.width(barWidth + '%');
        this.barDiff.width((100 - barWidth) + '%');
    };
