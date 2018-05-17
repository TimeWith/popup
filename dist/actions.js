'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showPopup = showPopup;
exports.closePopup = closePopup;
function showPopup(content) {
  return {
    type: 'SHOW_POPUP',
    payload: content
  };
}

function closePopup() {
  return {
    type: 'CLOSE_POPUP',
    payload: null
  };
}
//# sourceMappingURL=actions.js.map