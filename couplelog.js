function CoupleLog(couplelogCollection, data, currentUser) {
	this.hePerson = new Person('he');
	this.shePerson = new Person('she');
	this.couplelogCollection = couplelogCollection;
	this.data = data;
	this.current = '';
	this.type = data.type;
	var who = ['he'];
	if (currentUser != "") {
		who[data.she.user == currentUser ? 'unshift' : 'push']('she');
		this.current = who[0];
		this.uncurrent = who[1];
	}
	this.currentData = data[this.current];
	this.makeDOM();
}

CoupleLog.prototype.makeHTML = function() {
	return ['<div class="couplelog">',
		'<h1><span>', this.data.title, '</span></h1>',
		'<div class="slide">',
			'<table cellpadding="0" cellspacing="0" width="100%">',
				this.makeRowHTML('he', 'Он'),
				'<tr class="gap"><td colspan="3"><i/></td></tr>',
				this.makeRowHTML('she', 'Она'),
			'</table>',
			this.makeFormHTML(),
		'</div>',
	'</div>'].join('');
};

CoupleLog.prototype.makeRowHTML = function(who, whoTitle){
	return [
		'<tr class="', who, '">',
			'<td class="title">',
				this.current == who ? 'Я' : whoTitle,
			'</td>',
			this.barsAndCountsHTML,
		'</tr>'].join('');
};

CoupleLog.prototype.barsAndCountsHTML = [
	'<td style="width: 100%">',
		'<div class="canvas-container"></div>',
	'</td>',
	'<td class="counts">',
		'<span class="count count-main"/>',
		'<span class="diff">, <span class="count count-diff"/></span>',
	'</td>'].join('');

CoupleLog.prototype.makeFormHTML = function(){
	if (!this.current) return '';
	var action = this.currentData.action,
		button = this.currentData.button,
		buttonHTML = '<input type="button" value="' + button + '"/>';
	return ['<form action="">',
			'<p class="action">',
				action.indexOf(button) > -1 ?
					action.replace(button, buttonHTML) :
					action + ' ' + buttonHTML,
			'</p>',
			'<p class="cancel">',
				'<input type="button" value="Отменить"/> последнюю запись.',
			'</p>',
		'</form>'].join('');
};

CoupleLog.prototype.makeDOM = function(html) {
	this.elem = $(this.makeHTML()).appendTo(this.couplelogCollection.body);
	var _this = this;
	$.each({
		diffCount: '.count-diff',
		actionButton: '.action :button',
		cancel: '.cancel',
		cancelButton: '.cancel :button',
		title: 'h1',
		slide: '.slide'
	}, function(k, v){
		_this[k] = _this.elem.find(v);
	});

	this.setup = new Setup(this.couplelogCollection, this);

	this.hePerson.pMakeDOM(this);
	this.shePerson.pMakeDOM(this);

	this.hePerson.pMakeBar('blue');
	this.shePerson.pMakeBar('red');

	this.actionButton.click(function(){
		$(this).attr('disabled', 'disabled').animate({disabled: ''}, 1000);

//		_this.currentData.count++;
		(_this.type == "self" ? _this.currentData : _this.data[_this.uncurrent]).count++;
		_this.sync();

		_this.cancel.show();
		setTimeout(function(){ _this.cancel.fadeOut() }, 10000);
	});

	this.cancelButton.click(function(){
		_this.cancel.hide();
//		_this.currentData.count--;
		(_this.type == "self" ? _this.currentData : _this.data[_this.uncurrent]).count--;
		_this.sync();
	});

	this.title.click(function(){
		_this.couplelogCollection.makeCurrent(_this.data.id);
		if (_this.setup.menu != undefined) {
			_this.setup.menu.slideUp("fast");
			_this.setup.setupButton.slideDown("fast");
		};
		_this.sync();//перересовку иногда отключаю из-за глюка в фаерфоксе/фаербаге (при дэбаге не разворачивается адекватно)
	});

};

CoupleLog.prototype.sync = function(){
	var isHeMax = this.data.he.count > this.data.she.count,
		counts = [this.data.he.count],
		relation = {
			forhe: '',
			forshe: ''
		},
		pair = {
			he: 'he',
			she: 'she'
		},
		who = ['he'];
	counts[isHeMax ? 'unshift' : 'push'](this.data.she.count);

	if ((this.data.he.count == 0) && (this.data.she.count == 0)) {
		relation.forhe = 0;
		relation.forshe = 0;
	} else {
		who[isHeMax ? 'unshift' : 'push']('she');
		relation['for' + who[1]] = 1;
		relation['for' + who[0]] = (counts[0] / counts[1]);
	}

	var diff = counts[1] - counts[0];
	this.hePerson.row.toggleClass('in-min', !isHeMax).toggleClass('in-max', isHeMax);
	this.shePerson.row.toggleClass('in-min', isHeMax).toggleClass('in-max', !isHeMax);
	//разделено на две отдельные функции (а не объединено в одну как было ранее) чтобы сначала пересчитывать
	//обе цифры, а только после этого перерисовывать оба бара
	this.recount(pair, diff);
	this.resize(pair, relation);
};

CoupleLog.prototype.recount = function(pair, diff){
	for (var who in pair) {
		this[who + 'Person'].count.text("" + this.data[who].count);
	};
	this.diffCount.text("" + diff);
};

CoupleLog.prototype.resize = function(pair, relation){
	for (var who in pair) {
		this[who + 'Person'].pResize(relation);
	};
};

CoupleLog.prototype.destroy = function(){
	this.elem.remove();
};

function RaphBar(elem, color){
	var currentWidth = elem.width(),
		coeff = currentWidth ? 1 : 0;
	this.elem = elem[0];
	this.paper = new Raphael(this.elem, 0, 0);
	this.background = this.paper.rect(1, 1, 0, 0);
	this.background.attr({fill: 'gray', stroke: 'black', 'stroke-width': 2});
	this.bar = this.paper.rect(2, 2, 0, 0);
	this.bar.attr({fill: color, stroke: 'none'});
};

function Person(who){
	this.who = who;
};

Person.prototype.pResize = function(relation){
	this.canvasContainer.children().attr("display", "none");
	this.canvasContainer.width("0");
	this.canvasContainer.width();  // эта строка нужна, вот только непонятно почему
	this.canvasContainer.width("100%");
	var currentWidth = this.canvasContainer.width(),
		currentHeight = this.canvasContainer.height(),
		coeffW = currentWidth ? 1 : 0,
		coeffH = currentHeight ? 1 : 0;
	this.bar.paper.setSize(currentWidth, currentHeight);
	this.bar.background.attr({
		width: currentWidth - 4 * coeffW,
		height: currentHeight - 4 * coeffH
	});
	this.bar.bar.attr({
		width: currentWidth * relation['for' + this.who] - 6 * coeffW,
		height: currentHeight - 6 * coeffH
	});
	this.canvasContainer.children().attr("display", "block");
};

Person.prototype.pMakeBar = function(color){
	this.bar = new RaphBar(this.canvasContainer, color);
};

Person.prototype.pMakeDOM = function(couplelog){
	this.couplelog = couplelog;
	var _this = this;
	$.each({
		row: '.' + this.who,
		canvasContainer: '.' + this.who + ' .canvas-container',
		count: '.' + this.who + ' .count-main'
	}, function(k, v){
		_this[k] = _this.couplelog.elem.find(v);
	});
};
