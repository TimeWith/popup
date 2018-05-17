'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popupActions = undefined;

var _glamorous$div;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.popupReducer = popupReducer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _mediaQueries = require('@time-with/media-queries');

var _reactCustomScrollbars = require('react-custom-scrollbars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TWPopup = function (_Component) {
  _inherits(TWPopup, _Component);

  function TWPopup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TWPopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TWPopup.__proto__ || Object.getPrototypeOf(TWPopup)).call.apply(_ref, [this].concat(args))), _this), _this.handleClosePopup = function () {
      _this.props.closePopup();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TWPopup, [{
    key: 'adjustViewport',
    value: function adjustViewport() {
      var contentDiv = document.getElementById('popup-content-div');
      if (contentDiv) {
        var windowHeight = window.innerHeight;
        var popupContentHeight = contentDiv.clientHeight;
        if (popupContentHeight < windowHeight) {
          var newMarginTop = (windowHeight - popupContentHeight) / 2;
          var newMarginTopCompensation = newMarginTop / 8;
          contentDiv.style.marginTop = newMarginTop - newMarginTopCompensation + 'px';
        }
      }
      contentDiv.style.opacity = '1';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var content = this.props.content;


      if (!content) {
        return null;
      }

      setTimeout(function () {
        return _this2.adjustViewport();
      }, 1);
      return _react2.default.createElement(
        RootDIV,
        { id: 'popup-window' },
        _react2.default.createElement(
          ContentDIV,
          { id: 'popup-content-div', style: { opacity: 0 } },
          _react2.default.createElement(
            _reactCustomScrollbars.Scrollbars,
            { autoHeight: true, autoHeightMin: 300, autoHeightMax: window.innerHeight, id: 'quick-confirm-scrollbars', style: scrollBarsStyle },
            _react2.default.createElement(
              CloseDIV,
              { onClick: this.handleClosePopup },
              _react2.default.createElement(
                CloseP,
                null,
                'close'
              ),
              _react2.default.createElement(_reactFontawesome2.default, { name: 'close', display: closeIconStyle })
            ),
            _react2.default.createElement(
              ContentContainerDIV,
              null,
              content
            )
          )
        ),
        _react2.default.createElement(BGDIV, { onClick: this.handleClosePopup })
      );
    }
  }]);

  return TWPopup;
}(_react.Component);

var showPopup = function showPopup(content) {
  return {
    type: 'SHOW_POPUP',
    payload: content
  };
};
var closePopup = function closePopup() {
  return {
    type: 'CLOSE_POPUP',
    payload: null
  };
};

var popupActions = exports.popupActions = {
  showPopup: showPopup,
  closePopup: closePopup
};

function popupReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    content: null
  };
  var action = arguments[1];

  switch (action.type) {
    case 'SHOW_POPUP':
      {
        return _extends({}, state, {
          content: action.payload
        });
      }
    case 'CLOSE_POPUP':
      {
        return _extends({}, state, {
          content: null
        });
      }
    default:
      break;
  }
  return state;
}

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    content: store.popupReducer.content
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    closePopup: closePopup
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(TWPopup);

// dom elements


var scrollBarsStyle = {
  width: '100%',
  margin: '0 auto'
};

var ContentContainerDIV = _glamorous2.default.div((_glamorous$div = {
  padding: '30px',
  paddingTop: '0'
}, _defineProperty(_glamorous$div, _mediaQueries.tablet_max, {
  padding: '26px',
  paddingTop: '0'
}), _defineProperty(_glamorous$div, _mediaQueries.phablet_max, {
  padding: '23px',
  paddingTop: '0'
}), _defineProperty(_glamorous$div, _mediaQueries.phone_max, {
  padding: '20px',
  paddingTop: '0'
}), _glamorous$div));

var RootDIV = _glamorous2.default.div({
  zIndex: '200',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: '0',
  left: '0'
});

var ContentDIV = _glamorous2.default.div(_defineProperty({
  borderRadius: '3px',
  zIndex: '202',
  padding: '0px',
  maxWidth: '630px',
  position: 'relative',
  paddingTop: '0px',
  paddingBottom: '0px',
  margin: '0 auto',
  display: 'block',
  background: 'white',
  textAlign: 'center'
}, _mediaQueries.phablet_max, {
  width: '98%'
}));

var CloseDIV = _glamorous2.default.div({
  cursor: 'pointer',
  width: '100%',
  textAlign: 'right',
  paddingRight: '7px',
  paddingTop: '7px',
  '& .fa': {
    marginLeft: '10px',
    color: '#63C1E8',
    fontSize: '26px'
  }
});

var BGDIV = _glamorous2.default.div({
  position: 'absolute',
  zIndex: '201',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.5)'
});

var closeIconStyle = {
  display: 'inline-block',
  verticalAlign: 'top'
};

var CloseP = _glamorous2.default.p({
  display: 'inline-block',
  verticalAlign: 'top',
  fontWeight: 'bold',
  lineHeight: '26px',
  fontSize: '18px'
});
//# sourceMappingURL=index.js.map