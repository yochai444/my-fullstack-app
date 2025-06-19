import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { User } from '../types/userTypes';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private users;

  constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {
    const dbName = process.env.MONGO_DB_NAME;
    this.users = this.client.db(dbName).collection<User>('users');
  }

  async findAll(): Promise<User[]> {
    return this.users.find({}).toArray();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async createUser(username: string, password: string): Promise<User> {
    const newUser: User = {
      _id: new ObjectId(),
      name: username,
      password: password,
      role: 'student',
    };
    const res = await this.users.insertOne(newUser);
    return { ...newUser, _id: res.insertedId.toHexString() };
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.findOne({ name: username });
  }

  async verifyUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
