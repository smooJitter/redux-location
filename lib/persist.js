'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPersist = undefined;

var _pouchReduxMiddleware = require('pouch-redux-middleware');

var _pouchReduxMiddleware2 = _interopRequireDefault(_pouchReduxMiddleware);

var _reduxManager = require('redux-manager');

var _middleware = require('./middleware/middleware.pouch');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configPersist = exports.configPersist = function configPersist(_ref) {
  var db = _ref.db;
  var services = _ref.services;
  return _reduxManager.manager.middleware.set(_config.PERSIST, (0, _pouchReduxMiddleware2.default)((0, _middleware.configMiddlewarePouch)({
    db: db, services: services
  })));
};