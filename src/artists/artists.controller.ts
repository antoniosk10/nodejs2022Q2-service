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
import { ArtistsService } from './artists.service';
import { ArtistDto } from './dto/artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll(): Promise<ArtistEntity[]> {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<ArtistEntity> {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() CreateArtistDto: ArtistDto): Promise<ArtistEntity> {
    return this.artistsService.create(CreateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.artistsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateArtistDto: ArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ArtistEntity> {
    return this.artistsService.update(id, UpdateArtistDto);
  }
}
