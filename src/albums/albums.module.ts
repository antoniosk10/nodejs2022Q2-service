import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from './../tracks/tracks.module';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [TracksModule],
})
export class AlbumsModule {}
