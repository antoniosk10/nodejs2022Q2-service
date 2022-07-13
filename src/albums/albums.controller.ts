import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll(): Promise<Album[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Album> {
    return this.albumsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() CreateAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(CreateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Album> {
    return this.albumsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateAlbumDto: UpdateAlbumDto,
    @Param('id') id: string,
  ): Promise<Album> {
    return this.albumsService.update(id, UpdateAlbumDto);
  }
}
