function CoupleLogCollection(logs){
    this.logs = logs;
    this.couplelogs = {};
};

CoupleLogCollection.prototype.setMode = function(mode){
    this.isModeWdgt = mode == 'wdgt';
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
    this.place = this.likeLogin.elem;
    this.addLog = new AddLog(this, this.currentUser);
    if (!this.isModeWdgt && this.addLog.elem) {this.addLog.elem.hide()}
//    if (!this.isModeWdgt && this.likeLogin.elem) {this.likeLogin.elem.hide()}
    var _this = this;
    this.eachIf(function(id){
        _this.couplelogs[id] = new CoupleLog(_this, _this.logs[id], _this.currentUser);
        if (!_this.isModeWdgt) {_this.couplelogs[id].checkContainer.hide()}
        if (!_this.isModeWdgt && _this.couplelogs[id].setup.elem) {_this.couplelogs[id].setup.elem.hide()}
        if (!_this.isModeWdgt && !_this.logs[id].check) {_this.couplelogs[id].elem.hide()}
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

CoupleLogCollection.prototype.makeCurrent = function(title){
    var _this = this;

    function currentToggle(id){
        _this.couplelogs[id].slide.slideToggle("fast", function(){
            _this.couplelogs[id].sync();
        });
        _this.couplelogs[id].title.toggleClass("active");
    };

    this.eachIf(function(id){
        if (_this.couplelogs[id].title[0] == title) {
            currentToggle(id);
        } else if (_this.couplelogs[id].title.attr("class") == "active"){
                currentToggle(id);
            }
    });
};
