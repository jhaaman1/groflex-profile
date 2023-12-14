import axios from 'axios';
import * as actionTypes from './ActionType';
import { useNavigate } from 'react-router-dom';


export const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error,
});

export const registrationSuccess = () => ({
  type: actionTypes.REGISTRATION_SUCCESS,
});

export const register = (userData) => async (dispatch) => {
  // const navigate = useNavigate();
  try {
    const response = await axios.post('http://localhost:8080/api/user-registration', userData);
    console.log('res',userData)
    if (response.data) {
      alert(response.data.message)
      // navigate('/login')
    }
    if (!response.data) {
      throw new Error(response.data.message || 'Registration failed');
    }

    dispatch(registrationSuccess());
  } catch (error) {
    // Log error details for debugging
    console.error('Registration failed:', error);
    // Dispatch an action to handle the error in the Redux state
    dispatch(setError(error.message));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/api/user-login', credentials);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    const user = response.data.user;
    dispatch(loginSuccess(user));
  } catch (error) {
    // Dispatch an action to handle the error in the Redux state
    dispatch(setError(error.message));
  }
};
