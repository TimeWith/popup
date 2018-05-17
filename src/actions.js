export function showPopup(content) {
  return {
    type: 'SHOW_POPUP',
    payload: content,
  };
}

export function closePopup() {
  return {
    type: 'CLOSE_POPUP',
    payload: null,
  };
}
