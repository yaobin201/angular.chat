$(document).ready(function(){
var p_Btn = $('#barBtn em');
var p_trig = $('#p_trig');
var p_mbox = $('#topPop .p_mbox');
var p_time = $('#barTime');
var today = null;

$(p_Btn).click(function(){
	var cla = $(this).attr('class');
	var l = $(this).offset().left;
	var i = $(this).index();
	var c = $(this).siblings('.on').index();

	c = c >=0 ? c : 0;

	p_Btn.eq(c).removeClass('on');
	p_mbox.eq(c).removeClass('p_animte_in');
	p_mbox.eq(c).addClass('p_animte_out');
	
	p_trig.css('left',l+3);
	p_mbox.eq(i).css('left',l-5);

	if(cla && cla.indexOf('on') >= 0){
		$(this).removeClass('on');
		p_trig.css('display','none');
		p_mbox.eq(i).addClass('p_animte_out');
	}
	else{
		$(this).addClass('on');
		p_trig.css('display','block');
		p_mbox.eq(i).removeClass('p_animte_out');
		p_mbox.eq(i).addClass('p_animte_in');
	}
});
});

