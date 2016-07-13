'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMiddlewarePouch = configMiddlewarePouch;

var _reduxManager = require('redux-manager');

var _actions = require('../actions');

var _config = require('../config');

function configMiddlewarePouch(_ref) {
  var db = _ref.db;
  var _ref$services = _ref.services;
  var services = _ref$services === undefined ? [_config.SERVICE] : _ref$services;

  return services.map(function (service) {
    return {
      path: '/' + service + '/docs',
      db: db,
      actions: {
        insert: function insert(payload) {
          return _reduxManager.manager.dispatch({ type: _actions.types.INSERT, payload: payload }, payload.ns);
        },
        remove: function remove(payload) {
          return _reduxManager.manager.dispatch({ type: _actions.types.REMOVE, payload: payload }, payload.ns);
        },
        update: function update(payload) {
          return _reduxManager.manager.dispatch({ type: _actions.types.UPDATE, payload: payload }, payload.ns);
        }
      },
      changeFilter: function changeFilter(doc) {
        return doc.ns == service;
      }
    };
  });
}