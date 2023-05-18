import apiClient from '../apiClient';

export async function getPortfolioList() {
  try {
	const response = await apiClient.get(
		  `/portfolios/${localStorage.getItem('userId')}`
		);
    const { data } = response;
    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return { data: null, error: errorMessage };
  }
}

export async function getSinglePortfolio(portfolioId) {
	try {
	  // const response = await apiClient.get(
	  //   `/portfolios/${userId}`
	  // );
	  const response = await apiClient.get(
			`/portfolios/single/${portfolioId}`
		  );
	  const { data } = response;
	  return { data, error: null };
	} catch (error) {
	  const errorMessage = error.response?.data?.message || error.message;
	  return { data: null, error: errorMessage };
	}
  }