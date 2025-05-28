import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Level } from '../level/level.entity';

@Entity('devs')
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sexo: string;

  @Column({ type: 'date'})
  data_nascimento: string;

  @Column()
  hobby: string;

  @ManyToOne(() => Level, (nivel) => nivel.devs, { eager: true })
  @JoinColumn({ name: 'nivel_id' })
  nivel: Level;
}