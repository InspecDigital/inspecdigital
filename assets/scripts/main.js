/**
 * @fileOverview : main.js
 */

 var config = {
  navbar : {
    link : $('#nav-primary').find('a'),
    icon : 'i'
  }
 };

 $(document).ready(function() {

    var App = new AppCore();

 });

function AppCore() {

    'use strict';

    this._construct = function(self) {

      self.navbar();

      return self;

    }

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

    }

  return this._construct(this);

}