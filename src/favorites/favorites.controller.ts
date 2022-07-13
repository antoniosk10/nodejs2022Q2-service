import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './interfaces/favorite.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  addTrack(@Param('id') id: string): Promise<Favorites> {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string): Promise<Favorites> {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  addAlbum(@Param('id') id: string): Promise<Favorites> {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string): Promise<Favorites> {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  addArtist(@Param('id') id: string): Promise<Favorites> {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  removeArtist(@Param('id') id: string): Promise<Favorites> {
    return this.favoritesService.removeArtist(id);
  }
}
