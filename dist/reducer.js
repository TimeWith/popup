'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
function reducer() {
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
//# sourceMappingURL=reducer.js.map