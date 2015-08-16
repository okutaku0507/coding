//= require jquery
//= require jquery_ujs
//= require ace/ace
//= require ace/theme-twilight
//= require ace/theme-xcode
//= require ace/mode-ruby
//= require jquery-ace.min
//= require websocket_rails/main
//= require twitter/bootstrap

var React = require('react');
window.React = React;
_ = require('underscore');

$(document).ready(function(){
  $('.alert').delay(5000).fadeOut(1000);
});
