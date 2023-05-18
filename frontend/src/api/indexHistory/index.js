import apiClient from '../apiClient';

export async function getIndexHistory(startDate, endDate) {
  try {
    const response = await apiClient.get(
      `/index/KSE100/${startDate}/${endDate}`
    );
    const { data } = response;
    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return { data: null, error: errorMessage };
  }
}