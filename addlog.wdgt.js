function AddLog(couplelogCollection, currentUser){
    if (!currentUser) return;
    this.couplelogCollection = couplelogCollection;
    this.logs = couplelogCollection.logs;
    this.makeDOM();
};

AddLog.prototype.makeHTML = function(){
    return[
    '<div class="addlog">',
        '<input type="button" class="button" value="Добавить список"/>',
        '<div class="menu">',
            '<input type="text" class="text"/>',
            '<br />',
            '&nbsp;Формат списка:',
            '<br />',
            '<input type="radio" name="listtype" class="radio" value="self" checked/>Следить за собой',
            '<input type="radio" name="listtype" class="radio" value="other"/>Следить за другим',
            '<br />',
            '<input type="button" class="ok" value="OK"/>',
            '<input type="button" class="cancel" value="Cancel"/>',
            '',
        '</div>',
    '</div>'].join('');
};

AddLog.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).insertAfter(this.couplelogCollection.place);
    var _this = this;
    $.each({
        addButton: '.button',
        inputText: '.text',
        ok: '.ok',
        cancel: '.cancel',
        menu: '.menu',
        radio: '.radio'
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.couplelogCollection.place = this.elem;

    this.addButton.click(function(){
        _this.menu.toggle();
        _this.inputText.val("Тема нового списка");
        _this.addButton.toggle();
    });

    this.ok.click(function(){
        _this.logs.counter++;
        var currentId = 'id' + _this.logs.counter,
            currentType = $(_this.radio).filter(":checked").val();
        _this.logs[currentId] = {
            id: currentId,
            title: _this.inputText.val(),
            type: currentType,
            check: true,
            he: {
                user: 'veged',
                count: 0,
                action: currentType == 'self' ? 'Я' : 'Она',
                button: ' '
            },
            she: {
                user: 'lady_alice',
                count: 0,
                action: currentType == 'self' ? 'Я' : 'Он',
                button: ' '
            }
        };
        _this.addButton.trigger("click");
        _this.couplelogCollection.couplelogs[currentId] = new CoupleLog(_this.couplelogCollection, _this.couplelogCollection.logs[currentId], _this.couplelogCollection.currentUser);
        _this.couplelogCollection.couplelogs[currentId].title.trigger("click");
    });

    this.cancel.click(function(){
        _this.addButton.trigger("click");
    });

    this.inputText.click(function(){
        $(this).val("");
    });

};

AddLog.prototype.destroy = function(){
    if (this.elem) {
        this.elem.remove();
    };
};
