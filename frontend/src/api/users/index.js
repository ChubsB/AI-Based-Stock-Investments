import apiClient from '../apiClient';
import { setAuthToken } from '../apiClient';

export async function login(email, password) {
	try {
	  const response = await apiClient.post('/users/login', {
		email,
		password,
	  });
	  const { data } = response;
	  setAuthToken(data.token);
	  return { data, error: null };
	} catch (error) {
	  const errorMessage = error.response?.data?.message || error.message;
	  return { data: null, error: errorMessage };
	}
  }
