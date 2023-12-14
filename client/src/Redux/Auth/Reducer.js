// auth/reducer.js
import * as actionTypes from "./ActionType";

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTRATION_SUCCESS:
      return { ...state, error: null };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: null };
    case actionTypes.LOGOUT:
      return { ...state, user: null, error: null };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
