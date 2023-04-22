export const sortDataByDate = (data) => {
	return data.sort((a, b) => {
		const dateA = new Date(a.dates_);
		const dateB = new Date(b.dates_);

		if (dateA < dateB) {
			return -1;
		}
		if (dateA > dateB) {
			return 1;
		}
		return 0;
	});
};

export const convertDateFormat = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 to the month because JavaScript months are 0-indexed
	const day = ('0' + date.getDate()).slice(-2);

	return `${year}-${month}-${day}`;
};
