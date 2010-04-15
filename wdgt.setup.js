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
        '</div>'
    ].join('');
};

WdgtSetup.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).appendTo('body');
    var _this = this;
    $.each({
        setup: ".b-widget__control"
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.setup.click(function(){
        
        _this.couplelogCollection.destroy();
        _this.couplelogCollection.likeLogin.destroy();
        _this.couplelogCollection.likeLogin = new LikeLogin(couplelogCollection);
        _this.couplelogCollection.setCurrentUser('');
        _this.couplelogCollection.create();
        $('body').css("background-color", "#8e8ff3")
    });

};
