import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll(): Promise<Artist[]> {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() CreateArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(CreateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    return this.artistsService.update(id, UpdateArtistDto);
  }
}
