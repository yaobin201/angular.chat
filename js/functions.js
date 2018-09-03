/**
 * Created by Administrator on 15-7-20.
 */
var forTopPop = function(){
    this.p_Btn = '';
    this.p_trig = '';
    this.p_mbox = '';
    this.isinit = false;
    this.init = function(){
        if(!this.isinit){
            this.isinit = true;
            this.p_Btn = $('#barBtn em');
            this.p_trig = $('#p_trig');
            this.p_mbox = $('#topPop .p_mbox');
        }
    };
    this.clickMethod = function(obj,p_Btn, p_mbox, p_trig){
        var cla = $(obj).attr('class');
        var l = $(obj).offset().left;
        var i = $(obj).index();
        var c = $(obj).siblings('.on').index();
        c = c >= 0 ? c : 0;
        p_Btn.eq(c).removeClass('on');
        p_mbox.eq(c).removeClass('p_animte_in');
        p_mbox.eq(c).addClass('p_animte_out');
        p_trig.css('left', l + 3);
        p_mbox.eq(i).css('left', l - 5);
        if (cla && cla.indexOf('on') >= 0) {
            $(obj).removeClass('on');
            p_trig.css('display', 'none');
            p_mbox.eq(i).addClass('p_animte_out');
        }
        else {
            $(obj).addClass('on');
            p_trig.css('display', 'block');
            p_mbox.eq(i).removeClass('p_animte_out');
            p_mbox.eq(i).addClass('p_animte_in');
        }
    };
};
forTopPop.prototype.clickActive = function(obj){
    var _t = this;
    obj.bind('click',function(){
        _t.init();
        _t.clickMethod(this,_t.p_Btn,_t.p_mbox,_t.p_trig);
    });
};
var ps = {};
ps.init_ = function(){
    var _t = this;
    _t.con = $('#content');
    $(window).bind('resize',windowsize);
    $(window).bind('load',windowsize);
    function windowsize(){
        _t.con.css({width:$(window).width().w,height:$(window).height()});
    }
};

var cusBar = {};
cusBar.validHeight = function (){};
cusBar.viewHeight = function(viewObj){ return $(viewObj).height();};

String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
};

