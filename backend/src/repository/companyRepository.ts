import { ICompany, Company } from '../models/company';

export interface ICompanyRepository {
  findAll(): Promise<ICompany[]>;
  findByName(name: string): Promise<ICompany | null>;
  findAllSymbols(): Promise<ICompany[]>;
}

export class CompanyRepository implements ICompanyRepository {
  async findAll(): Promise<ICompany[]> {
    return await Company.find({});
  }

  async findByName(name: string): Promise<ICompany | null> {
    return await Company.findOne({ symbol: name });
  }

  async findAllSymbols(): Promise<ICompany[]> {
    return await Company.find({}, { symbol: 1, _id: 0 });
  }
}