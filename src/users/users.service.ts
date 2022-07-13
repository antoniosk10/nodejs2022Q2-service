import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User> {
    return this.users.find((user) => id === user.id);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const createTime = Date.now();
    const newUser = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: createTime,
      updatedAt: createTime,
    };
    this.users.push(newUser);
    return newUser;
  }

  async remove(id: string): Promise<User> {
    this.users = this.users.filter((user) => user.id !== id);
    return;
  }

  async update(id: string, userDto: UpdatePasswordDto): Promise<User> {
    let updatedUser: User | null = null;
    const updatedAt = Date.now();
    this.users = this.users.map((user) =>
      user.id === id
        ? (updatedUser = {
            ...user,
            password: userDto.newPassword,
            version: user.version + 1,
            updatedAt,
          })
        : user,
    );
    return updatedUser;
  }
}
