import apiClient from '../apiClient';

export async function getPortfolioList(userId) {
  try {
    // const response = await apiClient.get(
    //   `/portfolios/${userId}`
    // );
	const response = await apiClient.get(
		  `/portfolios/64229b5a265fd76e45965214`
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