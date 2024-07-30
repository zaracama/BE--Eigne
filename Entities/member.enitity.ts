import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.member)
  books: Book[];

  @Column({ default: false })
  isPenalized: boolean;

  @Column({ type: 'timestamp', nullable: true })
  penaltyUntil: Date | null;
}
