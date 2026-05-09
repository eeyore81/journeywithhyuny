const initialState = {
  isLoggedIn: true,
};

export default function authState(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SET':
      return { ...state, isLoggedIn: !!action.isLoggedIn };
    default:
      return state;
  }
}
