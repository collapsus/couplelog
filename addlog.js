function AddLog(couplelogCollection, currentUser){
    if (currentUser == "") {return;}
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
            '<input type="button" class="ok" value="OK"/>',
            '<input type="button" class="cancel" value="Cancel"/>',
            '',
        '</div>',
    '</div>'].join('');
};

AddLog.prototype.makeDOM = function(){
    this.elem = $(this.makeHTML()).appendTo('body');
    var _this = this;
    $.each({
        addButton: '.button',
        inputText: '.text',
        ok: '.ok',
        cancel: '.cancel'
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.addButton.click(function(){
        $(".addlog div.menu").toggle();
        $(_this.inputText).val("Тема нового списка");
        $(_this.addButton).toggle();
    });

    this.ok.click(function(){
        var next_id = hashLength(_this.logs);
        function hashLength(hash)
        {
            var counter = 0; // Иницилизируем счетчик
            for( var k in hash ) // Перебираем хэш, полученный нами в параметрах.
                counter++; // Считаем очередной элемент
            return counter; // Возвращаем сколько насчитали
        }

        next_id++;
        var currentId = 'id' + next_id;
        _this.logs[currentId] = {
            id: currentId,
            title: _this.inputText.val(),
            he: {
                user: 'veged',
                count: 0,
                action: '',
                button: ''
            },
            she: {
                user: 'lady_alice',
                count: 0,
                action: '',
                button: ''
            }
        };
        $(_this.addButton).trigger("click");
        _this.couplelogCollection.couplelogs[currentId] = new CoupleLog(_this.couplelogCollection, _this.couplelogCollection.logs[currentId], _this.currentUser);
    });

    this.cancel.click(function(){
        $(_this.addButton).trigger("click");
    });

    this.inputText.click(function(){
        $(this).val("");
    });

};

AddLog.prototype.destroy = function(){
    $(this.elem).remove();
};


