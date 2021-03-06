"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = "@@location";

var types = exports.types = {
  LOCATE: name + "/LOCATE",
  LOCATE_REQUEST: name + "/LOCATE_REQUEST",
  LOCATE_SUCCESS: name + "/LOCATE_SUCCESS",
  LOCATE_FAILURE: name + "/LOCATE_FAILURE",

  INSERT: name + "/INSERT",
  REMOVE: name + "/REMOVE",
  UPDATE: name + "/UPDATE"
};

var action = function action(type) {
  return function (payload) {
    return { type: type, payload: payload };
  };
};

var actions = exports.actions = {
  locate: action(types.LOCATE),
  insert: action(types.INSERT),
  remove: action(types.REMOVE),
  update: action(types.UPDATE)
};