'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _redux = require('redux');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initial = {
  status: { value: '', error: '' },
  docs: []
};

var configReducer = function configReducer() {
  var status = function status() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initial.status : arguments[0];
    var action = arguments[1];
    var payload = action.payload;

    switch (action.type) {
      case _actions.types.LOCATE_REQUEST:
        return Object.assign({}, state, { value: _actions.types.LOCATE_REQUEST });
      case _actions.types.LOCATE_SUCCESS:
        return Object.assign({}, state, { value: _actions.types.LOCATE_SUCCESS });
      case _actions.types.LOCATE_FAILURE:
        return Object.assign({}, state, { value: _actions.types.LOCATE_FAILURE, error: payload.error });
      default:
        return state;
    }
  };

  var docs = function docs() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initial.docs : arguments[0];
    var action = arguments[1];
    var payload = action.payload;
    var __ns__ = action.__ns__;

    switch (action.type) {
      case _actions.types.INSERT:
        return [_extends({}, payload, { ns: __ns__, _id: payload._id ? payload._id : (0, _cuid2.default)() })].concat(_toConsumableArray(state));
      case _actions.types.UPDATE:
        return state.map(function (doc) {
          return doc._id === payload._id ? _extends({}, doc, payload) : doc;
        });
      case _actions.types.REMOVE:
        return state.filter(function (doc) {
          return doc._id !== payload._id;
        });
      default:
        return state;
    }
  };

  return (0, _redux.combineReducers)({ status: status, docs: docs });
};

var reducer = exports.reducer = configReducer();