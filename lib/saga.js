'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saga = exports.configSaga = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxJournal = require('redux-journal');

var _reduxManager = require('redux-manager');

var _effects = require('redux-saga/effects');

var _actions = require('./actions');

var _config = require('./config');

var tags = _config.TAGS + '.saga';

var configSaga = exports.configSaga = function configSaga() {
  var _marked = [locate, watchLocate, root].map(regeneratorRuntime.mark);

  var api = function api(serviceName) {
    var API = _reduxManager.manager.api.get(serviceName);
    if (!API) throw new Error('manager.api.get(\'' + serviceName + '\') == undefined');
    return API;
  };

  function locate(action) {
    var __ns__, position;

    return regeneratorRuntime.wrap(function locate$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            __ns__ = action.__ns__;

            (0, _reduxJournal.write)('(action: { __ns__: ' + __ns__ + ' })', tags + '.*locate');
            _context.prev = 2;
            _context.next = 5;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_REQUEST });

          case 5:
            _context.next = 7;
            return (0, _effects.call)(api(__ns__).locate, action.payload);

          case 7:
            position = _context.sent;
            _context.next = 10;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.INSERT, payload: _extends({}, position) });

          case 10:
            _context.next = 12;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_SUCCESS });

          case 12:
            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](2);

            (0, _reduxJournal.error)(_context.t0);
            _context.next = 19;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_FAILURE, payload: { error: _context.t0 } });

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[2, 14]]);
  }

  function watchLocate() {
    var action;
    return regeneratorRuntime.wrap(function watchLocate$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!true) {
              _context2.next = 8;
              break;
            }

            _context2.next = 3;
            return (0, _effects.take)(_actions.types.LOCATE);

          case 3:
            action = _context2.sent;
            _context2.next = 6;
            return (0, _effects.fork)(locate, action);

          case 6:
            _context2.next = 0;
            break;

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function root() {
    return regeneratorRuntime.wrap(function root$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.fork)(watchLocate);

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  return { root: root, locate: locate };
};

var saga = exports.saga = configSaga();