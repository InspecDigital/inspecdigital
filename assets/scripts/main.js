/**
 * @fileOverview : main.js
 */

$(document).ready(function() {

  $('#nav-primary').find('a').on({
    mouseenter : function() {
      $(this).find('i').addClass('visible');
    },
    mouseleave : function() {
      $(this).find('i').removeClass('visible');
    }
  });

  $('#form-contact').on('submit', function(e) {

    e.preventDefault();

    var url = $(this).attr('action');
    var rawData = $(this).serializeArray();
    var data = {};
    var button = $(this).find('button');
    var message = $(this).find('#response');
    var buttonDefaultHTML = button.html();
    var buttonSendingHTML = $(this).find('#sending').html();
    var successMessage = $(this).find('#success').html();
    var failMessage = $(this).find('#fail').html();
    var formErrorMessage = '<span class="text-danger">Please fix the form errors and try again.</span>';
    var valid = true;

    button.prop('disabled', true).html(buttonSendingHTML);
    $.each(rawData, function(i, field) {
      if(field.value) {
        data[field['name']] = field.value;
      }
      else {
         valid = field.name === '_gotcha' ? valid : false;
        $('[name="' + field.name + '"]')
          .prop('aria-invalid', true)
          .prop('placeholder', field.name + ' is required')
          .parents('.form-group')
          .addClass('has-error');
      }
    });

    //pretend we don't need validation

    //send to formspree
    if(valid) {
      $('.has-error').removeClass('has-error');
      message.html('');
      $.ajax({
        url:url,
        method:'POST',
        data:data,
        dataType:"json"
      }).done(function(response) {
        message.html(successMessage);
      }).fail(function(response) {
        message.html(failMessage);
      }).always(function(response) {
        var fadeOutOptions = {
          duration: 1000,
          complete: function() {
            message.html('');
            message.show();
            button.prop('disabled', false);
            return this;
          }
        };
        button.html(buttonDefaultHTML);
        setTimeout(function() {
          message.fadeOut(fadeOutOptions);
        }, 5000);
      });
    }
    else {
      button.prop('disabled', false).html(buttonDefaultHTML);
      message.html(formErrorMessage);
    }

  });

});
