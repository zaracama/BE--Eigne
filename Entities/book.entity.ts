import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ default: 1 })
  stock: number;

  @ManyToOne(() => Member, (member) => member.books, { nullable: true })
  member: Member | null;

  @Column({ type: 'timestamp', nullable: true })
  borrowedAt: Date | null;
}
