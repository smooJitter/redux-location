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

var _myLocation = require('material-ui/svg-icons/maps/my-location');

var _myLocation2 = _interopRequireDefault(_myLocation);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tags = _config.TAGS + '.react.location.button';

var oneDelayedRequest = function oneDelayedRequest(delay, callback, promise) {
  return function () {
    return promise = promise ? promise : _bluebird2.default.delay(delay).then(function () {
      callback();
      promise = undefined;
    });
  };
};

var LocationButton = function (_React$Component) {
  _inherits(LocationButton, _React$Component);

  function LocationButton(props, context) {
    _classCallCheck(this, LocationButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocationButton).call(this, props, context));

    _this.onTouchTap = function () {
      _this.request();
      if (_this.props.onTouchTap) _this.props.onTouchTap();
    };

    _this.request = oneDelayedRequest(2000, function () {
      _this.setState({ newProduct: {} });
      _reduxManager.manager.dispatch(_reduxLocation.locationActions.locate(), _this.state.serviceName);
    });
    var _props$serviceName = props.serviceName;
    var serviceName = _props$serviceName === undefined ? _config.SERVICE : _props$serviceName;

    _this.state = {
      serviceName: serviceName,

      button: {
        tooltip: 'location',
        tooltipPosition: _this.props.tooltipPosition || 'bottom-left',
        onTouchTap: _this.onTouchTap
      }
    };
    return _this;
  }

  _createClass(LocationButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _bluebird2.default.delay(2000).then(function () {
        var location = (0, _reduxLocation.locationSelect)(_this2.props.location);
        var doc = location.docs.first();
        if (!doc) _this2.request();
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var location = (0, _reduxLocation.locationSelect)(nextProps.location);
      var doc = location.docs.first();
      if (doc && doc.lat && doc.lng) {
        this.setState({ textLocation: 'location (' + Number(doc.lat).toFixed(2) + ', ' + Number(doc.lng).toFixed(2) + ')' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      (0, _reduxJournal.write)('', tags + '.render');
      return _react2.default.createElement(
        _IconButton2.default,
        this.state.button,
        _react2.default.createElement(_myLocation2.default, null)
      );
    }
  }]);

  return LocationButton;
}(_react2.default.Component);

LocationButton.propTypes = {
  location: _react.PropTypes.object.isRequired,
  serviceName: _react.PropTypes.string,
  tooltipPosition: _react.PropTypes.string,
  onTouchTap: _react.PropTypes.func
};

exports.default = LocationButton;