import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) return user;
    throw new NotFoundException();
  }

  async getByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { login: username },
    });
    if (user) return user;
    throw new NotFoundException();
  }

  async create(
    userDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    const createTime = Date.now();
    const newUser = {
      ...userDto,
      version: 1,
      createdAt: createTime,
      updatedAt: createTime,
    };
    const user = this.userRepository.create(newUser);
    return (await this.userRepository.save(user)).toResponse();
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updatePassword(
    id: string,
    userDto: UpdatePasswordDto,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    const updatedAt = Date.now();
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      if (user.password !== userDto.oldPassword) {
        throw new ForbiddenException('oldPassword is wrong');
      }
      return (
        await this.userRepository.save(
          this.userRepository.create({
            ...user,
            password: userDto.newPassword,
            version: user.version + 1,
            createdAt: +user.createdAt,
            updatedAt: updatedAt,
          }),
        )
      ).toResponse();
    }
    throw new NotFoundException();
  }

  async updateHashRt(id: string, hash: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.save(
      this.userRepository.create({
        ...user,
        hashRt: hash,
      }),
    );
    return;
  }
}
