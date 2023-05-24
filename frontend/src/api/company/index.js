import apiClient from '../apiClient';

export async function getCompanyData(companyName) {
	try {
		const response = await apiClient.get(`/company/${companyName}`);
		const { data } = response;
		return { data, error: null };
	} catch (error) {
		const errorMessage = error.response?.data?.message || error.message;
		return { data: null, error: errorMessage };
	}
}

export async function getAllCompanies() {
	try {
		const response = await apiClient.get('/company');
		const { data } = response;
		return { data, error: null };
	} catch (error) {
		const errorMessage = error.response?.data?.message || error.message;
		return { data: null, error: errorMessage };
	}
}
