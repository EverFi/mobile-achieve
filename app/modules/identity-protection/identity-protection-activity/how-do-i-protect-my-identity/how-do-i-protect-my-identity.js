var BaseExtension = require('base-extension');
var _ = window._ || require('lodash');

var how_do_i_protect_my_identity = _.defaults({
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

module.exports = how_do_i_protect_my_identity;

