'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = undefined;

var _reduxJournal = require('redux-journal');

var _config = require('./config');

var tags = _config.TAGS + '.select';

var select = exports.select = function select(state) {
  if (!state) (0, _reduxJournal.warning)('state is ' + state, '' + tags);

  var status = function status() {
    return state.status.value;
  };
  var error = function error() {
    return state.status.error;
  };

  var docs = {};
  docs.byIndex = function (index) {
    return state.docs[index];
  };
  docs.first = function () {
    return state.docs[0];
  };
  docs.last = function () {
    return state.docs[state.docs.length - 1];
  };
  docs.length = function () {
    return state.docs.length;
  };

  var config = {};
  config.docsMax = function () {
    return state.config.docsMax;
  };
  config.docsMaxOverRemove = function () {
    return state.config.docsMaxOverRemove;
  };

  return { config: config, docs: docs, status: status, error: error };
};