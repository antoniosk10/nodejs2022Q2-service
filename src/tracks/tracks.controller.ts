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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll(): Promise<Track[]> {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.getById(id);
  }

  @Post()
  create(@Body() CreateTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.create(CreateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateTrackDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Track> {
    return this.tracksService.update(id, UpdateTrackDto);
  }
}
