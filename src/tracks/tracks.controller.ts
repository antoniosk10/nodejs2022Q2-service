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
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entities/track.entity';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll(): Promise<TrackEntity[]> {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<TrackEntity> {
    return this.tracksService.getById(id);
  }

  @Post()
  create(@Body() CreateTrackDto: TrackDto): Promise<TrackEntity> {
    return this.tracksService.create(CreateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.tracksService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateTrackDto: TrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TrackEntity> {
    return this.tracksService.update(id, UpdateTrackDto);
  }
}
