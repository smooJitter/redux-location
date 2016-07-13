"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var configSelect = function configSelect() {
  var docsNumber = function docsNumber(state) {
    return state.docs.length;
  };
  var first = function first(state) {
    return state.docs[0] || {};
  };

  return { docsNumber: docsNumber, first: first };
};

var select = exports.select = configSelect();