    function Setup(data){
		this.data = data;
		this.makeDOM();
	};
	
	Setup.prototype.makeHTML = function(){
		return ['<div class="setup ' + this.data.id + '">',
			'<div class="button-div">',
	            '<input type="button" value="Настройки" class="setup-button"/>',
			'</div>',
			'<div class="menu">',
	            '<input type="text" class="title-text" value="' + this.data.title + '"/>',
				'<br />',
				'<input type="text" class="he-action-text" value="' + this.data.he.action + '"/> выделите мышкой ту часть текста, которую вы хотите сделать кнопкой',
				'<br />',
				'<input type="text" class="she-action-text" value="' + this.data.she.action + '"/>',		
				'<br />',
				'<input type="button" class="setup-ok" value="OK"/>',
			'</div>',
		'</div>'].join('');
	};

	Setup.prototype.makeDOM = function(){
		this.elem = $(this.makeHTML()).appendTo('body');
		var _this = this;
		$.each({
			setupButtonDiv: '.button-div',
			setupButton: '.setup-button',
			titleText: '.title-text',
			heActionText: '.he-action-text',
			sheActionText: '.she-action-text',
			setupOk: '.setup-ok'
			}, function(k, v){
    			_this[k] = _this.elem.find(v);
            });
        
		this.setupOk.click(function(){
			
			$(".setup:not(.button-div)").hide();
			$("div:not(.setup)").show();
			_this.data.title = titleText.val();
			_this.data.he.action = heActionText.val();
			_this.data.she.action = sheActionText.val();
	
//		    if (couplelog[index] !== undefined) {
//				couplelog[index].destroy();
//		    };
	
//			couplelog[index] = new CoupleLog(elmnt, currentUser);
//			setup[index] = new Setup(elmnt);

		});
		
		this.setupButton.click(function(){
			$(".setup." + _this.data.id + " > .menu").show();
		});

        this.heActionText.mouseup(function(){
            _this.data.he.button = $selection.getText();
			alert('"' + _this.data.he.button + '" теперь кнопка');
        });

        this.sheActionText.mouseup(function(){
            _this.data.she.button = $selection.getText();
            alert('"' + _this.data.she.button + '" теперь кнопка');
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
	