import { ICompany, Company } from '../models/company';

export interface ICompanyRepository {
  findAll(): Promise<ICompany[]>;
}

export class CompanyRepository implements ICompanyRepository {
  async findAll(): Promise<ICompany[]> {
    return await Company.find({});
  }
}