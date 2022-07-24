import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const user = this.users.find((user) => id === user.id);
    if (user) return user;
    throw new NotFoundException();
  }

  async create(userDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const createTime = Date.now();
    const newUser = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: createTime,
      updatedAt: createTime,
    };
    const { password, ...responseUser } = newUser;
    this.users.push(newUser);
    return responseUser;
  }

  async remove(id: string): Promise<User> {
    const user = this.users.find((user) => id === user.id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
      return;
    }
    throw new NotFoundException();
  }

  async update(
    id: string,
    userDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    let updatedUser: User | null = null;
    const updatedAt = Date.now();
    const user = this.users.find((user) => id === user.id);
    if (user) {
      if (user.password !== userDto.oldPassword)
        throw new ForbiddenException('oldPassword is wrong');
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
      const { password, ...responseUser } = updatedUser;
      return responseUser;
    }
    throw new NotFoundException();
  }
}
