function Setup(couplelogCollection, couplelog){
    if (couplelog.current == "") {return;}
    this.couplelogCollection = couplelogCollection;
    this.couplelog = couplelog;
    this.data = this.couplelog.data;
    this.current = this.data[this.couplelog.current];
    this.makeDOM();
};

Setup.prototype.makeHTML = function(){
    return ['<div class="setup">',
        '<input type="button" value="Настройки" class="setup-button"/>',
        '<div class="menu">',
            '<input type="text" class="title" value="' + this.data.title + '"/>',
            '<br />',
            '<input type="text" class="action" value="' + this.current.action + '"/> ',
            '<input type="text" class="action-button" value="' + this.current.button + '"/>',
            '<br />',
            '<input type="checkbox" class="checkbox"/> Обнулить счётчики',
            '<br />',
            '<input type="button" class="setup-ok" value="OK"/>',
            '<input type="button" class="setup-cancel" value="Cancel"/>',
            '<br />',
            '<input type="button" class="setup-deletelog" value="Удалить список"/>',
        '</div>',
        '<div class="accept">',
            'Вы действительно хотите удалить этот список?',
            '<br />',
            '<input type="button" class="accept-ok" value="OK">',
            '<input type="button" class="accept-cancel" value="Cancel">',
        '</div>',
    '</div>'].join('');
};

Setup.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).prependTo(this.couplelog.slide);
    var _this = this;
    $.each({
        setupButton: '.setup-button',
        titleText: '.title',
        actionText: '.action',
        actionButton: '.action-button',
        setupOk: '.setup-ok',
        setupCancel: '.setup-cancel',
        menu: '.menu',
        checkbox: '.checkbox',
        deletelog: ".setup-deletelog",
        accept: ".accept",
        acceptOk: ".accept-ok",
        acceptCancel: ".accept-cancel"
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.setupOk.click(function(){

        _this.data.title = _this.titleText.val();
        _this.data[_this.couplelog.current].action = _this.actionText.val();
        _this.data[_this.couplelog.current].button = _this.actionButton.val();
        if (_this.checkbox.attr("checked")) {
            _this.data.he.count = 0;
            _this.data.she.count = 0;
        }
        _this.couplelogCollection.destroy();
        _this.couplelogCollection.create();
        _this.couplelogCollection.makeCurrent($.cookie('currenId'));
    });

    this.setupCancel.click(function(){
        _this.titleText.val(_this.data.title);
        _this.actionText.val(_this.data[_this.couplelog.current].action);
        _this.actionButton.val(_this.data[_this.couplelog.current].button);
        _this.checkbox[0].checked = false;
        _this.setupButton.show();
        _this.menu.toggle();
    });

    this.setupButton.click(function(){
        _this.menu.toggle();
        _this.setupButton.hide();
        _this.checkbox.attr("disabled", _this.data.he.count + _this.data.she.count == 0 ? "disabled" : "")
    });

    this.deletelog.click(function(){
        _this.deletelog.toggle();
        _this.accept.toggle();
    });

    this.acceptOk.click(function(){
        _this.couplelog.destroy();
        delete _this.couplelogCollection.logs[_this.couplelog.data.id];
    });

    this.acceptCancel.click(function(){
        _this.deletelog.trigger("click");
    });

};
