function Setup(couplelog){
    if (couplelog.current == "") {return;}
    this.couplelog = couplelog;
    this.data = this.couplelog.data;
    this.current = this.data[this.couplelog.current];
    this.makeDOM();
};

Setup.prototype.makeHTML = function(){
    return ['<div class="setup ' + this.data.id + '">',
        '<input type="button" value="Настройки" class="setup-button"/>',
        '<div class="menu">',
            '<input type="text" class="title" value="' + this.data.title + '"/>',
            '<br />',
            '<input type="text" class="action" value="' + this.current.action + '"/> выделите мышкой ту часть текста, которую вы хотите сделать кнопкой',
            '<br />',
            '<input type="checkbox" class="checkbox"/> Обнулить счётчики',
            '<br />',
            '<input type="button" class="setup-ok" value="OK"/>',
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
        setupOk: '.setup-ok',
        menu: '.menu',
        checkbox: '.checkbox'
    }, function(k, v){
        _this[k] = _this.elem.find(v);
    });

    this.setupOk.click(function(){

        _this.data.title = _this.titleText.val();
        _this.data[_this.couplelog.current].action = _this.actionText.val();
        if (_this.checkbox.attr("checked")) {
            _this.data.he.count = 0;
            _this.data.she.count = 0;
        }
        var active_id = _this.data.id;
        $.each(logs, function(index, element){

            couplelog[index].destroy();

            couplelog[index] = new CoupleLog(element, currentUser);

        });

        $(".couplelog." + active_id + " h1").trigger("click");

    });

    this.menu.change(function(){
        $(_this.setupButton).attr("disabled", "disabled")
        $(_this.setupOk).removeAttr("disabled")
    });

    this.setupButton.click(function(){
        $(this).siblings("div.menu").toggle();
        $(_this.setupOk).attr("disabled", "disabled");
    });

    this.actionText.mouseup(function(){
        console.log((txt = window.getSelection) == true);
        console.log(window.getSelection().toString());
        var selection = $selection.getText();
        if (selection != '') {
            _this.data[_this.couplelog.current].button = selection;
            alert('"' + _this.data[_this.couplelog.current].button + '" теперь кнопка');
            $(_this.menu).trigger('change');
        };
    });

};

$selection = {
    getText : function() {
        var txt = '';
        if (txt = window.getSelection) {
            txt = window.getSelection().toString();
        } else {
            txt = document.selection.createRange().text;
        }
        return txt;
    }
}
