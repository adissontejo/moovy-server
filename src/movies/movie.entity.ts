import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  rating: number;

  @Column({ name: 'poster_url' })
  posterUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
