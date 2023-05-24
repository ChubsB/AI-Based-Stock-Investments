import apiClient from '../apiClient';

export async function getPredictedPrice(companyName) {
  try {
    const response = await apiClient.get(
      `/predicted-price/${companyName}`
    );
    const { data } = response;
    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return { data: null, error: errorMessage };
  }
}
