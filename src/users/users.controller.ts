import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<Omit<UserEntity, 'password' | 'toResponse'>[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body() UserDto: CreateUserDto) {
    return this.usersService.create(UserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    return this.usersService.updatePassword(id, updateProductDto);
  }
}
