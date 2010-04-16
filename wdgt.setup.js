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
            '</div',
            '<input type="button" value="Применить" class="setup-submit" />',
        '</div>'
    ].join('');
};

WdgtSetup.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).appendTo('body');
    var _this = this;
    $.each({
        setup: ".b-widget__control",
        submit: ".setup-submit"
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

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
