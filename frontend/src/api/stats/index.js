import apiClient from '../apiClient';

export async function getBiggestGainers() {
  try {
    const response = await apiClient.get(
      `/standing/top-gainers`
    );
    const { data } = response;
    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return { data: null, error: errorMessage };
  }
}

export async function getBiggestLosers() {
  try {
    const response = await apiClient.get(
      `/standing/top-losers`
    );
    const { data } = response;
    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return { data: null, error: errorMessage };
  }
}

export async function getMostActive() {
  try {
    const response = await apiClient.get(
      `/standing/most-active`
    );
    const { data } = response;
    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return { data: null, error: errorMessage };
  }
}