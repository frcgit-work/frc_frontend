$(function() {
//   const box = document.getElementById('newsview');
// box.removeAttribute('style');
// box.style.width = null;
$('.more-info img').css('height', ''); 
// $('.more-info img').css({ 'width':'100%', 'max-height': '100%', 'max-width': '100%' }); 
// $(".more-info img").removeAttr("style");
$(".more-info img").removeAttr("background-color") ;


$('.footericon svg').removeAttr('style');
$(".slidemore").removeAttr("style");
$(".slidemore span").removeAttr("style");
// $(".slidemore img").addAttr("display","none");
// alert(document.getElementsByTagName('span').length);
// for(i=0;i<document.getElementsByTagName('span').length;i++)
// {
//     var span document.getElementsByTagName('span')[0];
//     var pa span.parentNode;
//     while(span.firstChild) pa.insertBefore(span.firstChild, span);
//     pa.removeChild(span);
//     i--;
// }
})

function test(){
    var util = UIkit.util;
    var offcanvasEl = util.$('#offcanvas-nav');
    UIkit.offcanvas(offcanvasEl).hide();
    // $('#offcanvas-bar').removeClass("uk-offcanvas-bar-animation");
    // $('#offcanvas-bar').removeClass("uk-offcanvas-slide");
    // $('#offcanvas-slide').removeClass('uk-open');
    // // $('#offcanvas-slide').css('display','none');
    // $('#offcanvas-slide').removeAttr("style");
}