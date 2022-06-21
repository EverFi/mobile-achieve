var BaseExtension = require('base-extension');
var _ = window._ || require('lodash');

var assessment_page_template = _.defaults({
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

module.exports = assessment_page_template;

