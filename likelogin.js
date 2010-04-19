function LikeLogin(couplelogCollection){
    this.couplelogCollection = couplelogCollection;
    this.couplelogCollection.body = $('body');
    this.makeDOM();
};

LikeLogin.prototype.makeHTML = function(){
    return[
    '<div class="likelogin">',
        '<b>Кто вы? </b>',
        '<br/>',
        '<input type="radio" name="who" class="select-who" value="Наблюдатель" checked>Наблюдатель',
        '<input type="radio" name="who" class="select-who" value="Он">Он',
        '<input type="radio" name="who" class="select-who" value="Она">Она',
    '</div>'
    ].join('');
};

LikeLogin.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).appendTo(this.couplelogCollection.body);
    var _this = this;
    $.each({
        selectWho: '.select-who'

    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.selectWho.change(function(){
        var cC = _this.couplelogCollection;
        cC.setCurrentUser('');
        if (this.value == 'Он') {
            cC.setCurrentUser('veged');
        } else if (this.value == 'Она') {
            cC.setCurrentUser('lady_alice');
        };
        cC.destroy();
        cC.create();
    });

};

LikeLogin.prototype.destroy = function(){
    this.elem.remove();
};
