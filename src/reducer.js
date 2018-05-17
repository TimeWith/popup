export default function reducer(state = {
  content: null,
}, action) {
  switch (action.type) {
    case 'SHOW_POPUP': {
      return {
        ...state,
        content: action.payload,
      };
    }
    case 'CLOSE_POPUP': {
      return {
        ...state,
        content: null,
      };
    }
    default:
      break;
  }
  return state;
}
