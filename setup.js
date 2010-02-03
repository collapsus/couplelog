    function Setup(data){
		this.data = data;
		this.makeDOM();
	};
	
	Setup.prototype.makeHTML = function(){
		return ['<div class="setup-button-div">',
            '<input type="button" value="Настройки" class="setup-button"/>',
		'</div>',
		'<div class="setup">',
            '<input type="text" class="title-text" value="' + this.data.title + '"/>',
			'<br />',
			'<input type="text" class="he-action-text" value="' + this.data.he.action + '"/> выделите мышкой ту часть текста, которую вы хотите сделать кнопкой',
			'<br />',
			'<input type="text" class="she-action-text" value="' + this.data.she.action + '"/>',		
			'<br />',
			'<input type="button" value="OK" class="setup-ok"/>',
		'</div>'].join('');
	};

	Setup.prototype.makeDOM = function(){
		this.elem = $(this.makeHTML()).prependTo('body');
		var _this = this;
		$.each({
			setupButtonDiv: '.setup-button-div',
			setupButton: '.setup-button',
			titleText: '.title-text',
			heActionText: '.he-action-text',
			sheActionText: '.she-action-text',
			setupOk: '.setup-ok',
			}, function(k, v){
    			_this[k] = _this.elem.find(v);
            });
        
		this.setupButton.click(function(){
			$("div").hide();
			$(".setup").show();
		});

        this.heActionText.mouseup(function(){
            _this.data.he.button = $selection.getText();
			alert('"' + data.he.button + '" теперь кнопка');
        });

        this.sheActionText.mouseup(function(){
            _this.data.she.button = $selection.getText();
            alert('"' + data.she.button + '" теперь кнопка');
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
	