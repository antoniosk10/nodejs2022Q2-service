import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [],
})
export class AlbumsModule {}
