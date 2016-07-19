'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saga = exports.configSaga = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxJournal = require('redux-journal');

var _reduxManager = require('redux-manager');

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _actions = require('./actions');

var _config = require('./config');

var _select = require('./select');

var tags = _config.TAGS + '.saga';

var configSaga = exports.configSaga = function configSaga() {
  var _marked = [locate, locateDelayed, watchLocate, docsMaxOverRemove, watchInsert, root].map(regeneratorRuntime.mark);

  var api = function api(serviceName) {
    var API = _reduxManager.manager.api.get(serviceName);
    if (!API) {
      var ERROR = 'manager.api.get(\'' + serviceName + '\') == undefined';
      (0, _reduxJournal.write)(ERROR, tags + '.configSaga.api');
      throw new Error(ERROR);
    }
    return API;
  };

  function locate(action) {
    var __ns__, position;

    return regeneratorRuntime.wrap(function locate$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            __ns__ = action.__ns__;

            (0, _reduxJournal.write)('(action: { __ns__: \'' + __ns__ + '\' })', tags + '.*locate');
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

  function locateDelayed(action) {
    var __ns__, payload, state, location$, position;

    return regeneratorRuntime.wrap(function locateDelayed$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __ns__ = action.__ns__;
            payload = action.payload;

            (0, _reduxJournal.write)('(action: { __ns__: \'' + __ns__ + '\' })', tags + '.*locateDelayed');
            _context2.prev = 3;
            _context2.next = 6;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_REQUEST });

          case 6:
            _context2.next = 8;
            return (0, _effects.call)(_reduxSaga.delay, payload.delay);

          case 8:
            _context2.next = 10;
            return (0, _effects.select)(function (state) {
              return state[__ns__];
            });

          case 10:
            state = _context2.sent;
            location$ = (0, _select.select)(state);

            if (!(!payload.check || payload.check && !location$.docs.length())) {
              _context2.next = 18;
              break;
            }

            _context2.next = 15;
            return (0, _effects.call)(api(__ns__).locate, action.payload);

          case 15:
            position = _context2.sent;
            _context2.next = 18;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.INSERT, payload: _extends({}, position) });

          case 18:
            _context2.next = 20;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_SUCCESS });

          case 20:
            _context2.next = 27;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](3);

            (0, _reduxJournal.error)(_context2.t0);
            _context2.next = 27;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_FAILURE, payload: { error: _context2.t0 } });

          case 27:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this, [[3, 22]]);
  }

  function watchLocate() {
    var action, _action$payload, payload;

    return regeneratorRuntime.wrap(function watchLocate$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!true) {
              _context3.next = 15;
              break;
            }

            _context3.next = 3;
            return (0, _effects.take)(_actions.types.LOCATE);

          case 3:
            action = _context3.sent;
            _action$payload = action.payload;
            payload = _action$payload === undefined ? {} : _action$payload;

            if (!payload.delay) {
              _context3.next = 11;
              break;
            }

            _context3.next = 9;
            return (0, _effects.fork)(locateDelayed, action);

          case 9:
            _context3.next = 13;
            break;

          case 11:
            _context3.next = 13;
            return (0, _effects.fork)(locate, action);

          case 13:
            _context3.next = 0;
            break;

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  function docsMaxOverRemove(action) {
    var __ns__, state, location$, docsMax, length, last;

    return regeneratorRuntime.wrap(function docsMaxOverRemove$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            __ns__ = action.__ns__;

            (0, _reduxJournal.write)('(action: { __ns__: \'' + __ns__ + '\' })', tags + '.docsMaxOverRemove');
            _context4.next = 4;
            return (0, _effects.select)(function (state) {
              return state[__ns__];
            });

          case 4:
            state = _context4.sent;
            location$ = (0, _select.select)(state);

            if (!location$.config.docsMaxOverRemove()) {
              _context4.next = 14;
              break;
            }

            docsMax = location$.config.docsMax();
            length = location$.docs.length();
            last = location$.docs.last();

            if (!(length > docsMax)) {
              _context4.next = 14;
              break;
            }

            (0, _reduxJournal.write)('REMOVE ' + last._id, tags + '.docsMaxOverRemove');
            _context4.next = 14;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.REMOVE, payload: { _id: last._id } });

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function watchInsert() {
    var action;
    return regeneratorRuntime.wrap(function watchInsert$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!true) {
              _context5.next = 8;
              break;
            }

            _context5.next = 3;
            return (0, _effects.take)(_actions.types.INSERT);

          case 3:
            action = _context5.sent;
            _context5.next = 6;
            return (0, _effects.fork)(docsMaxOverRemove, action);

          case 6:
            _context5.next = 0;
            break;

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this);
  }

  function root() {
    return regeneratorRuntime.wrap(function root$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _effects.fork)(watchLocate);

          case 2:
            _context6.next = 4;
            return (0, _effects.fork)(watchInsert);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  return { root: root };
};

var saga = exports.saga = configSaga();