var wc  = {};

wc.init = function(){
	this.config = {}; //存储窗口信息
};

wc.open = function(o){
	var frag = document.createDocumentFragment();
	var t = document.createElement('div');
	t.setAttribute('class','');
};

wc.close = function(o){
	var _this = this,
		n = o.className,
		i = n.indexOf('-')+1,
		l = n.length,
		w = n.substr(i,l-i), //窗口关联标示
		c = 'window-'+w; //窗口classname
		wp = wc.getByClass(document,c)[0], //窗口对象
		ic = wc.getByClass(document,w)[0], //图标对象
		wrap = document.getElementById('minWrap');
		cfg = _this.config[''+w+''] = {'icon':{'o':ic,'left':ic.offsetLeft+14,'top':ic.offsetTop+40,'width':72,'height':72},
								 'wind':{'o':wp,'left':wp.offsetLeft,'top':wp.offsetTop,'width':wp.clientWidth,'height':wp.clientHeight}};

		wp.style.transform = 'translate('+(cfg.icon.left-cfg.wind.left)+'px,'+(cfg.icon.top-cfg.wind.top)+'px) scale('+cfg.icon.width/cfg.wind.width+','+cfg.icon.height/cfg.wind.height+')';
		wp.style.opacity = 0;

		console.log(wp);
		setTimeout(function(){wrap.removeChild(wp);},1200);

	//wp.css('display','none');

};

wc.getByClass = function(par,clss){
	var oList=par.getElementsByTagName("*");
	var res=[];
	for(var i=0;i<oList.length;i++){
		if(oList[i].className.indexOf(clss)>=0){
			res.push(oList[i]);
			}
		}
	return res;
};