import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  artistId: string[];

  @Column('simple-array')
  albumId: string[];

  @Column('simple-array')
  trackId: string[];

  toResponse() {
    return this;
  }
}
