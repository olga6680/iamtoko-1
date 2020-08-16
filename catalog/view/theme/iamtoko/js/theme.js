function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}



$(document).ready(function() {
  if(window.location.pathname == '/index.php/page') { 
    $('.banner-pro').addClass(".banner-pro-hid"); 
  }
});


$(function () {  

//анимация
$(".slideDown").animated("bounceInDown");
$(".slideRight").animated("bounceInLeft");
$(".slideLeft").animated("bounceInRight");
$(".bounceIn").animated("bounceIn");
$(".flipInY").animated("flipInY");
$(".slideUp").animated("bounceInUp");

$('#content .category-content-thumb .product-layout:nth-child(8)').after($('#product-category .banner-pro'));

//Sale popup и Email popup
$('.button-sale-popup, .button-news-popup').magnificPopup({
  mainClass: 'mfp-zoom-in',
  removalDelay: 500
});

$('.button-salepopup').on('click', function() {
  $('.sale-popup, .news-popup').fadeOut();
  $.magnificPopup.close();
});

$('.button-newspopup').on('click', function() {
  $('.sale-popup, .news-popup').fadeOut();
  $('.form-news-popup').fadeIn();
});

$('.newsletter_box input[name=\'email\']').bind('keydown', function(e) {
  if (e.keyCode == 13) {
    $('#form-newspopup #button-subscribe, #button-subscribe').trigger('click');
  }
});

$('#form-newspopup #button-subscribe, #button-subscribe').on('click', function () {
  var success_message = $('#success_message').val()
  $.ajax({
    url: 'index.php?route=product/category/subscribe',
    type: 'post',
    dataType: 'json',
    data: 'email=' + encodeURIComponent($('input[id=\'email\']').val()),
    beforeSend: function () {
      $('#form-newspopup #button-subscribe, #button-subscribe').button('loading');
    },
    complete: function () {
      $('#form-newspopup #button-subscribe, #button-subscribe').button('reset');
    },
    success: function (json) {
      $('.text-success, .text-danger').remove();
      if (json['error']) {
        $('#respond').after('<div class="text-success text-danger" style="margin:20px 0;"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '</div>');
        setTimeout(function() {
          $('.text-danger').fadeOut('fast');
        }, 2000);
      }
      if (json['success']) {
        $('#respond').after('<div class="text-success" style="margin:20px 0;"><i class="fa fa-check-circle"></i> ' + success_message + '</div>');
        $.cookie( 'newsletter_already_added' , 1 , { expires: 14 , path: '/' });
        setTimeout(function() {
          $.magnificPopup.close();
        }, 1900);	
        $('input[id=\'email\']').val('');
        setTimeout(function() {
          $('.text-success').fadeOut('fast');
        }, 2000);
      }
    }
  });
});

$('.button-sale-popup, .button-news-popup').on('click', function() {
  $('.sale-popup, .news-popup').fadeIn();
});

$('.clos-sort, .btn-menu-menu, .btn-contact-menu').click(function() {
  $(this).toggleClass('clos-sort-plus');
});  

//product video   
function hide() {
  $('.video-product').toggleClass('col-md-12 visible');
};




//4 фото в категориях
$('.category-content-thumb > .product-layout > .product-thumb').each(function (e) { 

  e +=1;

$(this).parent().attr({
  'class' : 'product-layout product-grid col-lg-3 col-md-4 col-sm-6 col-xs-12 data-bal="element-bal"'

});  
});  


$('.swiper-slide > .rewiev-wrapper > .caption > .text-rewiev').css('height', '').equalHeights();

//Купить в один клик
$('.product-layout > .product-thumb').each(function (e) { 


  var $easyzoom = $('.easyzoom').easyZoom();
  // Setup thumbnails example
  var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
  
  $('.thumbnails').on('click', 'a', function(e) {
    var $this = $(this);
    e.preventDefault();
    // Use EasyZoom's `swap` method
    api1.swap($this.data('standard'), $this.attr('href'));
  });  

});


$('.product-thumb h4').css('height', '').equalHeights();

});


$(function() {
  // при нажатии на кнопку scrollup
  $('.scrollup').click(function() {
    // переместиться в верхнюю часть страницы
    $("html, body").animate({
      scrollTop:0
    },1000);
  });
});
// при прокрутке окна (window)
$(window).scroll(function() {
  // если пользователь прокрутил страницу более чем на 200px
  if ($(this).scrollTop()>400) {
    // то сделать кнопку scrollup видимой
    $('.scrollup, .button-coll-side').fadeIn();
  }
  // иначе скрыть кнопку scrollup
  else {
    $('.scrollup, .button-coll-side').fadeOut();
  }

/*--------- скрытие птички при открытии суб меню 
var bg = document.getElementById('main-item');
document.getElementById('sub-menu').addEventListener("mousedown", function(){bg.style.display = "none";this.addEventListener("mousedown", function(){bg.style.display = "block";});
});---*/ 

/*---
var bg = document.getElementById('item-c');
document.getElementById('main-close').addEventListener("mousedown", function(){bg.style.opacity = "0";this.addEventListener("mousedown", function(){bg.style.opacity = "1";});
});---*/ 

});

















