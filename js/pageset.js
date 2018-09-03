var ps = {};

ps.init = function(){
	var _t = this;
	_t.con = document.getElementById('content');
	ps.listenEvent(window,'resize',windowsize);
	ps.listenEvent(window,'load',windowsize);
	function windowsize(){
		_t.con.style.width = _t.getBodyWH().w + 'px';
		_t.con.style.height = _t.getBodyWH().h + 'px';
		//document.body.style.width = _t.getBodyWH().w + 'px';
		//document.body.style.height = _t.getBodyWH().h + 'px';
	}
};

ps.listenEvent = function(target,type,listener){
	return target.addEventListener ? target.addEventListener(type, listener, false) : target.attachEvent('on'+type,listener);
};

ps.getBodyWH = function(){
	var dom = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
	return {
		w : Math.min(dom.scrollWidth || dom.clientWidth,dom.clientWidth),
		h : Math.min(dom.scrollHeight || dom.clientHeight,dom.clientHeight)
	};
};
