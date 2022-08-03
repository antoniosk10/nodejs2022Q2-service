import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { MyLogger } from './common/logger/logger.service';
import { LoggerMiddleware } from './common/logger/logger.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(configService),
    MyLogger,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
