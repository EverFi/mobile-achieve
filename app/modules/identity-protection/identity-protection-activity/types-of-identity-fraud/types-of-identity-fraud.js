var BaseExtension = require('base-extension');
var _ = window._ || require('lodash');

var types_of_identity_fraud = _.defaults({
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

module.exports = types_of_identity_fraud;

