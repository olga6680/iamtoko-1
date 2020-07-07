$(function () {
//анимация
$(".slideDown").animated("bounceInDown");
$(".slideRight").animated("bounceInLeft");
$(".slideLeft").animated("bounceInRight");
$(".bounceIn").animated("bounceIn");
$(".flipInY").animated("flipInY");
$(".slideUp").animated("bounceInUp");


//Купить в один клик
$('.product-layout > .product-thumb').each(function (e) { 

  e +=1;

		var one_click = $('#one_click').val(),
        name_callback = $('#name_callback').val(),
        phone_callback = $('#phone_callback').val(),
        entry_name = $('#entry_name').val(),
        entry_phone = $('#entry_phone').val(),
        text_send = $('#text_send').val(),
        text_loading = $('#text_loading').val(),
        img_url   = $(this).find('.img-responsive').attr('src'),
        item_name = $(this).find('h4 a').text(),
        item_price = $(this).find('.price').text();


$(this).after('\
  <div id="modalFeedbackHeader-' + e + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalFeedbackHeaderLabel" aria-hidden="true">\
    <div class="modal-dialog" role="document">\
      <div class="modal-content">\
        <div class="modal-body">\
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
            <span aria-hidden="true">&times;</span>\
          </button>\
          <h3>' + one_click + '</h3>\
            <div class="pp-img"><img src="' + img_url + '" alt="IamToko" /></div>\
            <div class="pp-content">\
              <h4>' + item_name + '</h4>\
              <p>' + item_price + '</p>\
              <form class="form-horizontal" id="form-feedback-header">\
                <div class="form-group">\
                  <input type="text" name="name" value="' + name_callback + '" placeholder="' + entry_name + '" id="input-name" class="form-control" /> <br>\
                  <input type="text" name="phone" value="' + phone_callback + '" placeholder="' + entry_phone + '"  id="input-phone" class="form-control" required />\
                  <input type="hidden" name="product" value="' + item_name + '" id="input-product" class="form-control" />\
                </div>\
              </form>\
              <button type="button" id="button_send_feedback_header" data-loading-text="' + text_loading + '"  class="btn btn-primary">' + text_send + '</button>\
            </div>\
        </div>\
      </div>\
    </div>\
  </div>');

$(this).find('.button-group').append('<a class="toclick" id="button_feedback" data-toggle="modal" href=" #modalFeedbackHeader-' + e + '"><i class="fa fa-send-o"></i> <span class="hidden-xs hidden-sm hidden-md"> ' + one_click + '</span></a>');
});

$('.product-thumb h4').css('height', '').equalHeights();


$('#button_send_feedback_header').on('click', function () {
  $.ajax({
    url: 'index.php?route=common/header/write',
    type: 'post',
    dataType: 'json',
    data: $("#form-feedback-header").serialize(),
    beforeSend: function () {
      $('#button_send_feedback_header').button('loading');
    },
    complete: function () {
      $('#button_send_feedback_header').button('reset');
    },
    success: function (json) {
      $('.alert-success, .alert-danger').remove();
      if (json['error']) {
        $('#form-feedback-header').after('<div class="alert alert-danger" style="margin:20px 0;"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '</div>');
      }
      if (json['success']) {
        $('#form-feedback-header').after('<div class="alert alert-success" style="margin:20px 0;"><i class="fa fa-check-circle"></i> ' + json['success'] + '</div>');
        $('input[name=\'name\']').val('');
        $('input[name=\'phone\']').val('');
        $('input[name=\'email\']').val('');
        $('input[name=\'product\']').val('');
      }
    }
  });
});

});

$(function() {
  // при нажатии на кнопку scrollup
  $('.scrollup').click(function() {
    // переместиться в верхнюю часть страницы
    $("html, body").animate({
      scrollTop:0
    },1000);
  })
})
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
});


