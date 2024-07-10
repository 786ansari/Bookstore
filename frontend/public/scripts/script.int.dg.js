if(!window.jQuery){window.jQuery || document.write('<script src="'+siteurl+'scripts/jquery-1.8.3.min.js">\x3C/script>');} 

function include(url){ 
document.write('<script src="'+ url + '" type="text/javascript"></script>'); 
}
include(siteurl+'scripts/helpers.min.js');
include(siteurl+'scripts/jquery.placeholder.js');
include(siteurl+'fancybox/jquery.fancybox-1.3.4.pack.js');

if(Page=='home'){
}
if(Page=='details'){
include(siteurl+'zoom/magiczoomplus.js');
}
else{
}


jQuery(window).load(function(e) {
	
/*$('#banner').flash({src: 'swf/banner.swf', width: 191, height: 33,'wmode':'transparent', 'allowfullscreen':'true', 'menu' : 'false', 'allowscriptaccess':'always'});*/
$('#logo').flash({src: siteurl+'swf/logo.swf', width: 226, height: 100,'wmode':'transparent', 'allowfullscreen':'true', 'menu' : 'false', 'allowscriptaccess':'always','flashvars': {'Baseurl':'index.htm'} });

/*$('.refer').fancybox({  'width' : 520, 'height' : 285, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe'});*/
/*$('.invoice').fancybox({  'width' : 940, 'height' : 600, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe'});
$('.forgot').fancybox({  'width' : 520, 'height' : 210, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe'});
$('.map').fancybox({  'width' : 520, 'height' : 340, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe'});*/

$('input.tab-reg').click(function(){var dg='.'+$(this).attr('title'); $('.reg_box').slideUp('fast');$(dg).slideDown('fast'); });
$("a[data-rel=gallery]").fancybox({'type':'image','titlePosition':'over', 'padding':'0','centerOnScroll' : true});
$('a[data-rel=gallery]').live('click', function() {$(this).fancybox(settings).click();}); 

$('input').placeholder();$('textarea').placeholder();

/*
$('.tabs').click(function(){var dg=$(this).attr('href'); $('.tab_cont').css({'visibility':'hidden','left':'-4000px','top':'-2000px','position':'absolute'});$(dg).css({'visibility':'visible','left':'0px','top':0,'position':'relative'}); $('.tabs').removeClass('act'); $(this).addClass('act'); return false})
$('.topmenu li').hover(function(){$('div.first_menu',this).show()},function(){$('div.first_menu',this).hide()})
$('.submenu').mouseenter(function(){$('a:first',this).addClass('act');$('.sub_cat:first',this).show()}).mouseleave(function(){$('.sub_cat',this).hide();$('a',this).removeClass('act');}) 



$('.topmenu1 li').hover(function(){$('div',this).fadeIn('fast')},function(){$('div',this).hide()})

$(function(){$(".featured_pro").jCarouselLite({vertical:true,hoverPause:true,visible:8,auto:2000,speed:2000});});
$(function(){$(".testimonial_scroll").jCarouselLite({vertical: true,hoverPause:true,auto:2000,visible:1,speed:400});});
$(function(){$(".detail_scroll").jCarouselLite({btnPrev:".prev1",btnNext:".next1",vertical: false,hoverPause:true,visible:4,auto:2000,speed:800});});
$(function(){$(".scroll_details").jCarouselLite({btnPrev:".prev3",btnNext:".next3",vertical: false,hoverPause:true,visible:4,auto:2000,speed:400});});

$(function(){$(".slidertop").jCarouselLite({vertical: false,hoverPause:true,visible:4,auto:1000,speed:500});});
$(function(){$(".slidertop1").jCarouselLite({vertical: false,hoverPause:true,visible:4,auto:2000,speed:1000});});
*/


$(".slidertop").jCarouselLite({vertical:false,btnPrev:".prevs",btnNext:".nexts",hoverPause:true,visible:4,auto:7000,speed:600});

$(".slidertop1").jCarouselLite({vertical:false,btnPrev:".prevs1",btnNext:".nexts1",hoverPause:true,visible:4,auto:5000,speed:1000});

$(".slidertop2").jCarouselLite({vertical:false,btnPrev:".prevs2",btnNext:".nexts2",hoverPause:true,visible:4,auto:6000,speed:800});




$(function(){$(".company_scroll").jCarouselLite({vertical: false,hoverPause:true,visible:7,auto:2000,speed:800});});

$(function(){$(".top_scroll").jCarouselLite({vertical: false,hoverPause:true,visible:3,auto:2000,speed:600});});




$(".fq li a").bind("click", function() {$(this).next().slideToggle('fast')
 var src = ($('img',this).attr("src") ==="images/fq-b.png")
? "images/fq-r.png" 
: "images/fq-b.png";
  $('img',this).attr("src", src);
});

$(".scroll").click(function(event){
event.preventDefault();
$('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
});






$("#back-top").hide();	
$(function () {$(window).scroll(function () {if ($(this).scrollTop() > 100) {$('#back-top').fadeIn();} else {$('#back-top').fadeOut();}});
$('#back-top a').click(function () {$('body,html').animate({scrollTop: 0}, 800);return false;});
});

if(Page=='home'){
}




/*Download Catalogue*/

jQuery(document).ready(function() {  $(".invoice-pop").fancybox({'Width' : 250 ,'Height' : 340,
           'hideOnContentClick': false, 
           'type':'iframe'
      }); 
});



/*
$(".invoice-pop").fancybox({
  'hideOnContentClick' : true,
  'width' : 350,
  'height' : 270,
  'type' : 'iframe',
  'padding' :0,
  'onComplete' : function() {
    $('#fancybox-frame').load(function() { // wait for frame to load and then gets it's height
      $('#fancybox-content').height($(this).contents().find('body').height()+0);
    });
  }
});

*/

/*Download Catalogue End*/

/*login*/

/*$('.pup-login').fancybox({'type': 'iframe','centerOnScroll': true,'width':505,'height': 325,'margin':0,
    'autoScale': false,'autoDimensions': false
});*/



$(".pup-login").fancybox({
  'hideOnContentClick' : true,
  'width' : 800,
  'height' : 480,
  'type' : 'iframe',
  'padding' :0,
  'onComplete' : function() {
    $('#fancybox-frame').load(function() { // wait for frame to load and then gets it's height
      $('#fancybox-content').height($(this).contents().find('body').height()+0);
    });
  }
});

/*login End*/


/* signup */



$(".signup-pop").fancybox({
  'hideOnContentClick' : true,
  'width' : 800,
  'height' : 480,
  'type' : 'iframe',
  'padding' :0,
  'onComplete' : function() {
    $('#fancybox-frame').load(function() { // wait for frame to load and then gets it's height
      $('#fancybox-content').height($(this).contents().find('body').height()+0);
    });
  }
});


/* signup End*/

$('.pup-viewcart').fancybox({'type': 'iframe','centerOnScroll': true,'width':600,'height': 200,'margin':0,
    'autoScale': false,'autoDimensions': false
});


//$('.topmenu li').hover(function(){$('div',this).show()},function(){$('div',this).hide()})
/*$('input').placeholder();$('textarea').placeholder();
$(function(){$(".test-scroll").jCarouselLite({vertical:true,hoverPause:true,visible:1,auto:2000,speed:400});});
$('input.tabs').click(function(){var dg='.'+$(this).attr('title'); $('.form_box').slideUp();$(dg).slideDown(); })
$('.tabs1').click(function(){var dg=$(this).attr('href'); $('.form_box1').css({'display':'none'});$(dg).css({'display':'block'}); $('.tabs1').removeClass('act'); $(this).addClass('act'); return false})
$('.catelink').click(function(){$('.catelink').next().slideUp('fast');$('.catelink').removeClass('act');$(this).addClass('act');$(this).next().slideDown('fast');})
$(".invoice-pop").fancybox({  'width' : 900, 'height' : 600, 'autoScale' : false, 'transitionIn' : 'fade', 'transitionOut' : 'fade', 'type' : 'iframe'});
$('select.changeable').change(function() {$('.r-cont').hide(); $('#' + $(this).find('option:selected').attr('value')).show();});

if(Page=='home'){
$(function(){$('#fluid_dg_wrap_1').fluid_dg({thumbnails: false,height:"400px",loader:'none',hover:'false',pagination:'false',time:3000});})
}*/

});






( function( $ ) {
$( document ).ready(function() {
$('#leftmenu > ul > li > a').click(function() {
  $('#leftmenu li').removeClass('active');
  $(this).closest('li').addClass('active');	
  var checkElement = $(this).next();
  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
    $(this).closest('li').removeClass('active');
    checkElement.slideUp('normal');
  }
  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
    $('#leftmenu ul ul:visible').slideUp('normal');
    checkElement.slideDown('normal');
  }
  if($(this).closest('li').find('ul').children().length == 0) {
    return true;
  } else {
    return false;	
  }		
});
});
} )( jQuery );







( function( $ ) {
$( document ).ready(function() {
$('#employment > ul > li > a').click(function() {
  $('#employment li').removeClass('active');
  $(this).closest('li').addClass('active');	
  var checkElement = $(this).next();
   if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
    $(this).closest('li').removeClass('active');
    checkElement.slideUp('normal');
  }
  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
    $('#employment ul ul:visible').slideUp('normal');
    checkElement.slideDown('normal');
  }
  if($(this).closest('li').find('ul').children().length == 0) {
    return true;
  } else {
    return false;	
  }		
});
});
} )( jQuery );



/*Feedback From*/

   $(document).ready(function () {
           $('#test').feedBackBox();
       });

/*Feedback From*/






/*Logo*/

/*
$(function() {
	var sticky_navigation_offset_top = $('#logo').offset().top;
	var sticky_navigation = function(){
	var scroll_top = $(window).scrollTop(); 
		if (scroll_top > sticky_navigation_offset_top) { 
			$('#logo').css({ 'position': 'fixed', 'top':0, 'left':0, });
		} else {
			$('#logo').css({ 'position': 'relative' }); 
		}   
	};
	sticky_navigation();
	$(window).scroll(function() {
		 sticky_navigation();
	});
	$('a[href="#"]').click(function(event){ 
		event.preventDefault(); 
	});
});
*/
/*Logo END*/









/*Slider*/


jQuery(document).ready(function(){
jQuery('#demo').skdslider({'delay':5000, 'fadeSpeed': 2000,'showNextPrev':true,'showPlayButton':true,'autoStart':true});
jQuery('#demo1').skdslider({'delay':5000, 'fadeSpeed': 2000,'autoStart':true});
});

/*Slider*/


/*var navigation = responsiveNav("#ct", {customToggle: "#toggle"});*/





/*$(document).ready(function() {	
    $(window).scroll(function() {		  
       var scrollVal = $(this).scrollTop();		
        if ( scrollVal > 47) {		
 			  $(".menuToHide").slideUp(); 			 
        }else {	
             $(".menuToHide").slideDown();			
         }		
    });
 });*/



//var widthh=("Width with scrollbars: " + $(window).width());
var widthh=$(window).width();
//alert(widthh);

if(widthh==320 || widthh==360 || widthh==480 || widthh==640){ }else{
	 
	 $(document).ready(function() {	
   $(window).scroll(function() {		  
       var scrollVal = $(this).scrollTop();		
        if ( scrollVal > 47) {	
			  //$('#fixed').css({'position':'fixed','top' :'0px','z-index':'100'}).show();
			 
			  $(".menuToHide").slideUp(); 			 
			
        }else {	
		
             $(".menuToHide").slideDown();			
			        //$('#fixed').css({'position':'static','top':'auto'}).show();
        }		
    });
 });
}






/*Header fixed */

/*jQuery(window).scroll(function() {
  if (jQuery(this).scrollTop() >0) {
    jQuery("#fixed").css({"position": "fixed", "top": 0, });
  } else {
    jQuery("#fixed").removeAttr("style");
  }
});





jQuery(window).scroll(function() {
  if (jQuery(this).scrollTop() >0) {
	$("#scpof").stop().animate({width:'808px'}, 10);
    jQuery("#scpof").css({"position": "fixed", "top":15, "left":260, });
  } else {
    jQuery("#scpof").removeAttr("style");
  }
});
*/
/*Search fixed */




/*Search fixed */


