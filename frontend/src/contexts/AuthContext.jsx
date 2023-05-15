import React, { createContext, useContext, useReducer } from 'react';
import { getAuthToken } from '../api/apiClient';
import { authReducer, authActionTypes } from '../reducers/AuthReducer';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = {
  isAuthenticated: !!getAuthToken(),
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuthenticated = (authenticated) => {
    dispatch({ type: authActionTypes.SET_AUTHENTICATED, payload: authenticated });
  };

  const update = (newState) => {
    dispatch({ type: authActionTypes.UPDATE_STATE, payload: newState });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, setAuthenticated, update }}>
      {children}
    </AuthContext.Provider>
  );
};