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
  var _marked = [locate, watchLocate, locateDelayed, watchLocateDelayed, docsMaxOverRemove, watchInsert, root].map(regeneratorRuntime.mark);

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

  function locateDelayed(action) {
    var __ns__, payload, state, location$;

    return regeneratorRuntime.wrap(function locateDelayed$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            __ns__ = action.__ns__;
            payload = action.payload;
            _context3.prev = 2;
            _context3.next = 5;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_DELAYED_REQUEST });

          case 5:
            _context3.next = 7;
            return (0, _effects.call)(_reduxSaga.delay, payload.delay);

          case 7:
            _context3.next = 9;
            return (0, _effects.select)(function (state) {
              return state[__ns__];
            });

          case 9:
            state = _context3.sent;
            location$ = (0, _select.select)(state);

            if (!payload.check) {
              _context3.next = 17;
              break;
            }

            if (location$.docs.length()) {
              _context3.next = 15;
              break;
            }

            _context3.next = 15;
            return (0, _effects.call)(locate, action);

          case 15:
            _context3.next = 19;
            break;

          case 17:
            _context3.next = 19;
            return (0, _effects.call)(locate, action);

          case 19:
            _context3.next = 26;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3['catch'](2);

            (0, _reduxJournal.error)(_context3.t0);
            _context3.next = 26;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.LOCATE_FAILURE, payload: { error: _context3.t0 } });

          case 26:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this, [[2, 21]]);
  }

  function watchLocateDelayed() {
    var action;
    return regeneratorRuntime.wrap(function watchLocateDelayed$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!true) {
              _context4.next = 8;
              break;
            }

            _context4.next = 3;
            return (0, _effects.take)(_actions.types.LOCATE_DELAYED);

          case 3:
            action = _context4.sent;
            _context4.next = 6;
            return (0, _effects.fork)(locateDelayed, action);

          case 6:
            _context4.next = 0;
            break;

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function docsMaxOverRemove(action) {
    var __ns__, state, location, docsMax, length, last;

    return regeneratorRuntime.wrap(function docsMaxOverRemove$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            __ns__ = action.__ns__;

            (0, _reduxJournal.write)('(action: { __ns__: \'' + __ns__ + '\' })', tags + '.docsMaxOverRemove');
            _context5.next = 4;
            return (0, _effects.select)(function (state) {
              return state[__ns__];
            });

          case 4:
            state = _context5.sent;
            location = (0, _select.select)(state);

            if (!location.config.docsMaxOverRemove()) {
              _context5.next = 14;
              break;
            }

            docsMax = location.config.docsMax();
            length = location.docs.length();
            last = location.docs.last();

            if (!(length > docsMax)) {
              _context5.next = 14;
              break;
            }

            (0, _reduxJournal.write)('REMOVE ' + last._id, tags + '.docsMaxOverRemove');
            _context5.next = 14;
            return (0, _effects.put)({ __ns__: __ns__, type: _actions.types.REMOVE, payload: { _id: last._id } });

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this);
  }

  function watchInsert() {
    var action;
    return regeneratorRuntime.wrap(function watchInsert$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!true) {
              _context6.next = 8;
              break;
            }

            _context6.next = 3;
            return (0, _effects.take)(_actions.types.INSERT);

          case 3:
            action = _context6.sent;
            _context6.next = 6;
            return (0, _effects.fork)(docsMaxOverRemove, action);

          case 6:
            _context6.next = 0;
            break;

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  function root() {
    return regeneratorRuntime.wrap(function root$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _effects.fork)(watchLocate);

          case 2:
            _context7.next = 4;
            return (0, _effects.fork)(watchLocateDelayed);

          case 4:
            _context7.next = 6;
            return (0, _effects.fork)(watchInsert);

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _marked[6], this);
  }

  return { root: root };
};

var saga = exports.saga = configSaga();