'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareStore = undefined;

var _reduxJournal = require('redux-journal');

var _reduxManager = require('redux-manager');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _config = require('./config');

var _reducer = require('./reducer');

var _saga = require('./saga');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tags = _config.TAGS + '.saga';

var prepareStore = exports.prepareStore = function prepareStore() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? { serviceName: _config.SERVICE } : arguments[0];

  var _ref$serviceName = _ref.serviceName;
  var serviceName = _ref$serviceName === undefined ? _config.SERVICE : _ref$serviceName;

  (0, _reduxJournal.write)('(serviceName = \'' + serviceName + '\')', tags + '.prepareStore');
  _reduxManager.manager.enableSaga((0, _reduxSaga2.default)());
  _reduxManager.manager.reducer.set(serviceName, _reducer.reducer, true);
  _reduxManager.manager.saga.set(_config.SAGA, _saga.saga.root);
};