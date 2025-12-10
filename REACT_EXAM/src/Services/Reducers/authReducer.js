const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER_SUCCESS":
      return { ...state, user: action.payload, error: null };

    case "LOGOUT_SUCCESS":
      return { ...state, user: null, error: null };

    case "AUTH_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
