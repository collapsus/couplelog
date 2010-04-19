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
            '<div class="info-button">i</div>',
            '<input type="button" value="Применить" class="setup-submit" />',
            '<br/>',
            '<br/>',
            '<div class="info">Этот проэкт создан для того, чтобы можно было наглядно и ',
                    'красноречиво посчитать, кто чего и сколько сделал, как хорошего, так и плохого</div>',
        '</div>'
    ].join('');
};

WdgtSetup.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).appendTo(this.couplelogCollection.body);
    var _this = this;
    $.each({
        control: ".b-widget__control",
        setup: ".b-widget__control__setup",
        submit: ".setup-submit",
        info: ".info",
        infoButton: ".info-button"
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.control.css('margin-top', parseFloat(this.couplelogCollection.body.css('font-size')) * 1.5 - 12);

    this.setup.click(function(){

        _this.couplelogCollection.destroy();
        _this.couplelogCollection.likeLogin.elem.show();
        _this.couplelogCollection.setMode('wdgt');
        _this.couplelogCollection.create();
        _this.couplelogCollection.body.css("background-color", "#dedefa");

        $(this).hide();

        _this.submit.show();
        widget.adjustIFrameHeight();
    });

    this.submit.click(function(){
        _this.couplelogCollection.destroy();
        _this.couplelogCollection.likeLogin.elem.hide();
        _this.couplelogCollection.setMode('cntnt');
        _this.couplelogCollection.create();
        _this.couplelogCollection.body.css("background-color", "");
        $(this).hide();

        _this.setup.show();
        widget.adjustIFrameHeight();
    });

    this.infoButton.click(function(){
        _this.info.slideToggle();
    });

};
