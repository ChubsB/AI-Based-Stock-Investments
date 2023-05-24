import express from 'express';
import { CompanyRepository } from '../repository/companyRepository';

const companyRouter = express.Router();
const companyRepo = new CompanyRepository();

companyRouter.get('/:companyName', async (req, res) => {
	const { companyName } = req.params;

	// Assuming `findByName()` method returns null if company not found
	const company = await companyRepo.findByName(companyName);
	if (!company) {
		return res.status(404).json({ error: 'Company not found' });
	}

	res.json(company);
});

companyRouter.get('/', async (req, res) => {
	const companies = await companyRepo.findAllSymbols();
	res.json(companies);
});

export default companyRouter;
