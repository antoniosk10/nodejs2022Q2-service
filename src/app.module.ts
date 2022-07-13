import { Module } from '@nestjs/common';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/tracks.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, TracksModule, AlbumsModule, ArtistsModule],
})
export class AppModule {}
