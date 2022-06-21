var BaseExtension = require('base-extension');
var _ = window._ || require('lodash');

var carousel_page_template = _.defaults({
  initialized: function(view) {

  },
  loaded: function(view) {

  },
  playing: function(view) {

  },
  paused: function(view) {

  },
  stopped: function(view) {

  },
  completed: function(view) {
  },
  unloading: function(view, onComplete) {
    onComplete();
  }
}, BaseExtension);

module.exports = carousel_page_template;

