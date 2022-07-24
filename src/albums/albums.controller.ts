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
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll(): Promise<AlbumEntity[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<AlbumEntity> {
    return this.albumsService.getById(id);
  }

  @Post()
  create(@Body() CreateAlbumDto: AlbumDto): Promise<AlbumEntity> {
    return this.albumsService.create(CreateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.albumsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateAlbumDto: AlbumDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AlbumEntity> {
    return this.albumsService.update(id, UpdateAlbumDto);
  }
}
