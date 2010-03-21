function CoupleLogCollection(logs){
    this.logs = logs;
    this.couplelogs = {};
};

CoupleLogCollection.prototype.setCurrentUser = function(currentUser){
    this.currentUser = currentUser;
};

CoupleLogCollection.prototype.create = function(){
    this.addLog = new AddLog(this, this.currentUser);
    var _this = this;
    $.each(this.logs, function(id, value) {
        if (id != 'counter') {
            _this.couplelogs[id] = new CoupleLog(_this, _this.logs[id], _this.currentUser);
        }
    });
};

CoupleLogCollection.prototype.destroy = function(){
    var _this = this;
    $.each(this.logs, function(id, value) {
        if (id != 'counter') {
            if (_this.couplelogs[id] != undefined) {
                _this.couplelogs[id].destroy();
                _this.addLog.destroy();
            }
        }
    });
};

CoupleLogCollection.prototype.makeCurrent = function(title){
    var _this = this;
    $.each(this.logs, function(id, value){
        if (id != 'counter') {
            if (_this.couplelogs[id].title[0] == title) {
                _this.couplelogs[id].slide.slideToggle("fast");
                _this.couplelogs[id].title.toggleClass("active");
            } else {
                _this.couplelogs[id].slide.slideUp("fast");
                _this.couplelogs[id].title.removeClass("active");
            };
        }
    });
};
