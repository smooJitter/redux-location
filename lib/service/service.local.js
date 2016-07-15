'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configServiceLocal = undefined;

var _reduxJournal = require('redux-journal');

var _reduxManager = require('redux-manager');

var _config = require('../config');

var _store = require('../store');

var _api = require('../api/api.local');

var tags = _config.TAGS + '.service.local';

var configServiceLocal = exports.configServiceLocal = function configServiceLocal() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? { serviceName: _config.SERVICE } : arguments[0];

  var _ref$serviceName = _ref.serviceName;
  var serviceName = _ref$serviceName === undefined ? _config.SERVICE : _ref$serviceName;

  (0, _reduxJournal.write)('({ serviceName = \'' + serviceName + '\' })', tags + '.configServiceLocal');
  (0, _store.prepareStore)({ serviceName: serviceName });
  return _reduxManager.manager.api.set(serviceName, (0, _api.configAPILocal)());
};