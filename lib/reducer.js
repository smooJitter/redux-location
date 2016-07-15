'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initial = {
  config: {
    docsMax: 2,
    docsMaxOverRemove: true
  },
  docs: [],
  status: { value: '', error: '' }
};

var reducer = exports.reducer = function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initial : arguments[0];
  var action = arguments[1];
  var payload = action.payload;
  var __ns__ = action.__ns__;
  var config = state.config;
  var status = state.status;
  var docs = state.docs;


  var doStatus = function doStatus(value) {
    return Object.assign({}, { config: config, docs: docs }, { status: { value: value } });
  };
  var doFail = function doFail(value, error) {
    return Object.assign({}, { config: config, docs: docs }, { status: { value: value, error: error } });
  };
  var doDocs = function doDocs(docs) {
    return Object.assign({}, { config: config, status: status }, { docs: docs });
  };

  switch (action.type) {
    case _actions.types.LOCATE_REQUEST:
      return doStatus(_actions.types.LOCATE_REQUEST);
    case _actions.types.LOCATE_SUCCESS:
      return doStatus(_actions.types.LOCATE_SUCCESS);
    case _actions.types.LOCATE_FAILURE:
      return doFail(_actions.types.LOCATE_FAILURE, payload.error);

    case _actions.types.INSERT:
      return doDocs([_extends({}, payload, { ns: __ns__, _id: payload._id ? payload._id : (0, _cuid2.default)() })].concat(_toConsumableArray(state.docs)));
    case _actions.types.UPDATE:
      return doDocs(state.docs.map(function (doc) {
        return doc._id === payload._id ? _extends({}, doc, payload) : doc;
      }));
    case _actions.types.REMOVE:
      return doDocs(state.docs.filter(function (doc) {
        return doc._id !== payload._id;
      }));

    default:
      return state;
  }
};