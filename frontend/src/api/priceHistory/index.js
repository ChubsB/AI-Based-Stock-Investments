import apiClient from '../apiClient';

export async function getPriceHistory(companyName, startDate, endDate) {
  try {
    const response = await apiClient.get(
      `/price-history/${companyName}/${startDate}/${endDate}`
    );
    const { data } = response;
    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return { data: null, error: errorMessage };
  }
}