    function AddLog(logs){
        this.logs = logs;
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
//            var next_id = _this.logs['id2'].id.match(/[0-9]+/);
            var next_id = hashLength(_this.logs);
            function hashLength(hash)
            {
                var counter = 0; // Иницилизируем счетчик
                for( var k in hash ) // Перебираем хэш, полученный нами в параметрах.
                counter++ // Считаем очередной элемент
                return counter // Возвращаем сколько насчитали
            }

            next_id++;
            _this.logs[next_id] = {
                id: 'id' + next_id,
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
//            alert('Список "' + _this.inputText.val() + '" добавлен.');
            $(_this.addButton).trigger("click");
        });

        this.cancel.click(function(){
            $(_this.addButton).trigger("click");
        });

        this.inputText.click(function(){
            $(this).val("");
        });

    };


