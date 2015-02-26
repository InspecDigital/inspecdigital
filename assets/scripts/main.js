/**
 * @fileOverview : main.js
 */

 var config = {
  contactForm : {
    form : $('.contact-form'),
    result : $('.contact-form-results-row'),
    submitSelector : '.submit',
    url : '/assets/inc/contact.php'
  },
  navbar : {
    link : $('#nav-primary').find('a'),
    icon : 'i'
  }
 };

 $(document).ready(function() {

    var App = new AppCore();

    App.navbar();
    App.contactForm();

    return true;

 });

function AppCore() {

    'use strict';

    this._construct = function(self) {

      return self;

    };

    this.contactForm = function(options) {

      var _options = config.contactForm;
      $.extend(_options, options);

      _options.form.find(_options.submitSelector).off('click').on('click', function(e) {
        e.preventDefault();
        $.ajax({
          url : _options.url,
          type : 'POST',
          data : _options.form.serialize(),
          complete : function(result) {
            console.log(result);
            _options.form.fadeOut();
            _options.result.fadeIn();
          }
        });
      });

      return self;

    };

    this.navbar = function(options) {

      var _options = {
        link : '',
        icon : ''
      };

      $.extend(true, _options, config.navbar, options);

      $(_options.link).on({
        mouseenter : function() {
          $(this).find(_options.icon).addClass('visible');
        },
        mouseleave : function() {
          $(this).find(_options.icon).removeClass('visible');
        }
      });

      return this;

    };

  return this._construct(this);

}
