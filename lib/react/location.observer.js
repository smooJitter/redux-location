'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxJournal = require('redux-journal');

var _reduxManager = require('redux-manager');

var _reduxLocation = require('redux-location');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _beenhere = require('material-ui/svg-icons/maps/beenhere');

var _beenhere2 = _interopRequireDefault(_beenhere);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var doIsOnceSuccess = function doIsOnceSuccess() {
  var beforeStatus = '';
  return function (status) {
    if (status == _reduxLocation.locationTypes.LOCATE_SUCCESS && beforeStatus != status) {
      beforeStatus = status;
      return true;
    }
    beforeStatus = status;
  };
};

var LocationObserver = function (_React$Component) {
  _inherits(LocationObserver, _React$Component);

  function LocationObserver(props, context) {
    _classCallCheck(this, LocationObserver);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocationObserver).call(this, props, context));

    _this.isOnceSuccess = doIsOnceSuccess();

    _this.state = {
      styleIconButton: styles.normal
    };
    return _this;
  }

  _createClass(LocationObserver, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var _this2 = this;

      var location = (0, _reduxLocation.locationSelect)(this.props.location);
      var status = location.status();
      if (this.isOnceSuccess(status)) {
        this.setState({ styleIconButton: styles.success });
        _bluebird2.default.delay(500).then(function () {
          _this2.setState({ styleIconButton: styles.normal });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      (0, _reduxJournal.write)('', 'location.observer.render');

      return _react2.default.createElement(
        _IconButton2.default,
        { style: this.state.styleIconButton },
        _react2.default.createElement(_beenhere2.default, null)
      );
    }
  }]);

  return LocationObserver;
}(_react2.default.Component);

var styles = {
  normal: { backgroundColor: _colors.yellow100 },
  success: { backgroundColor: _colors.green100 }
};

exports.default = LocationObserver;