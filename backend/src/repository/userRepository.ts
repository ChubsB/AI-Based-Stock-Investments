import { Model } from 'mongoose';
import { IUser, User } from '../models/userModel';

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export class UserRepository {
  private model: Model<IUser>;

  constructor() {
    this.model = User;
  }

  async create(userData: CreateUserInput): Promise<IUser> {
    return this.model.create(userData);
  }

  async findById(id: string): Promise<IUser | null> {
    return this.model.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return this.model.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return this.model.findByIdAndRemove(id);
  }
}