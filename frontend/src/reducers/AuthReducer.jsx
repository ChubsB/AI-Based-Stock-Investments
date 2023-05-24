// authReducer.js
export const authActionTypes = {
	SET_AUTHENTICATED: 'SET_AUTHENTICATED',
	UPDATE_STATE: 'UPDATE_STATE',
  };
  
  export const authReducer = (state, action) => {
	switch (action.type) {
	  case authActionTypes.SET_AUTHENTICATED:
		return { ...state, isAuthenticated: action.payload };
	  case authActionTypes.UPDATE_STATE:
		return { ...state, ...action.payload };
	  default:
		return state;
	}
  };
  