import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Developer } from '../developer/developer.entity';

@Entity('niveis')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nivel: string;

  @OneToMany(() => Developer, (dev) => dev.nivel)
  devs: Developer[];
}