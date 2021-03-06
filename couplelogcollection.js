function CoupleLogCollection(logs){
	this.logs = logs;
	this.couplelogs = {};
};

CoupleLogCollection.prototype.setCurrentUser = function(currentUser){
	this.currentUser = currentUser;
};

CoupleLogCollection.prototype.eachIf = function(whatToDo){
	$.each(this.logs, function(id, value){
		if(id != 'counter') {
			whatToDo(id);
		}
	});
}

CoupleLogCollection.prototype.create = function(){
	this.addLog = new AddLog(this, this.currentUser);
	var _this = this;
	this.eachIf(function(id){
		_this.couplelogs[id] = new CoupleLog(_this, _this.logs[id], _this.currentUser);
	});
};

CoupleLogCollection.prototype.destroy = function(){
	var _this = this;
	this.eachIf(function(id){
		if (_this.couplelogs[id] != undefined) {
			_this.couplelogs[id].destroy();
			_this.addLog.destroy();
		}
	});
};

CoupleLogCollection.prototype.makeCurrent = function(idn){
	var _this = this;
	//перерисовка баров при изменении размеров окна
	$(window).resize(function(){
		_this.couplelogs[idn].sync();
		forceOperaRepaint();
		
		// Forcing Opera full page reflow/repaint to fix page draw bugs
		function forceOperaRepaint() {
			if (window.opera) {
				var bs = document.body.style;
				bs.position = 'relative';
				setTimeout(function() {
					bs.position = 'static';
				}, 1);
			}
		}
	});

	$.cookie('currentId', null, { expires: 1 })
	function currentToggle(id){
		_this.couplelogs[id].slide.slideToggle("fast", function(){
//			_this.couplelogs[id].sync();
		});
		_this.couplelogs[id].title.toggleClass("active");

	};

	this.eachIf(function(id){
		if (_this.couplelogs[id].data.id == idn) {
			currentToggle(id);
		} else if (_this.couplelogs[id].title.attr("class") == "active"){
				currentToggle(id);
			}

		if (_this.couplelogs[id].title.attr("class") == "active") {
			$.cookie('currentId', idn, { expires: 1 })
		}
		_this.couplelogs[id].sync();
	});
};
