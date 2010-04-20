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

    this.selectWho.click(function(){
        var cC = _this.couplelogCollection;
        cC.setCurrentUser('');
        if (this.value == 'Он') {
            cC.setCurrentUser('veged');
        } else if (this.value == 'Она') {
            cC.setCurrentUser('lady_alice');
        };
        $.cookie('currentWho', this.value, { expires: 1 })
        cC.destroy();
        cC.create();
    });

};

LikeLogin.prototype.setWho = function(who){
    var _this = this,
        _who = who;
    $.each(_this.couplelogCollection.likeLogin.selectWho, function(k, v){
        if ($(v).val() == _who) {
            $(this).attr('checked', 'checked').trigger('click');
        }
    });
};

LikeLogin.prototype.destroy = function(){
    this.elem.remove();
};
