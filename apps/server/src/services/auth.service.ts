import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../types/userTypes';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'super-secret-key'; 

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async register(username: string, password: string): Promise<User> {
    return this.usersService.createUser(username, password);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ token: string; user: Partial<User> }> {
    const user = await this.usersService.verifyUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      sub: user._id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return { token, user: payload };
  }

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
