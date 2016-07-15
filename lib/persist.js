'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPersist = undefined;

var _reduxManager = require('redux-manager');

var _config = require('./config');

var _actions = require('./actions');

var configPersist = exports.configPersist = function configPersist(_ref) {
  var db = _ref.db;
  var _ref$serviceList = _ref.serviceList;
  var serviceList = _ref$serviceList === undefined ? [_config.SERVICE] : _ref$serviceList;

  var services = {};
  serviceList.map(function (serviceName) {
    return services[serviceName] = {
      INSERT: _actions.types.INSERT,
      REMOVE: _actions.types.REMOVE,
      UPDATE: _actions.types.UPDATE
    };
  });
  _reduxManager.manager.middleware.set(_config.PERSIST, (0, _reduxManager.configMiddlewarePouch)({ db: db, services: services }));
};