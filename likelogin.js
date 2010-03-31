function LikeLogin(couplelogCollection){
    this.couplelogCollection = couplelogCollection;
    this.couplelogCollection.body = $('body');
    this.makeDOM();
};

LikeLogin.prototype.makeHTML = function(){
    return[
    '<div class="likelogin">',
        '<b>Кто вы? </b>',
        '<select name="who" class="select-who">',
            '<option disabled>Выберите пользователя</option>',
            '<option selected value="Наблюдатель">Наблюдатель</option>',
            '<option value="Он">Он</option>',
            '<option value="Она">Она</option>',
        '</select>',
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
