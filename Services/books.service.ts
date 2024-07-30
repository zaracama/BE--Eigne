// books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Member } from '../members/member.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async borrowBook(bookCode: string, memberCode: string): Promise<Book> {
    const member = await this.membersRepository.findOne({
      where: { code: memberCode },
      relations: ['books'],
    });
    if (!member) throw new Error('Member not found');
    if (member.isPenalized) throw new Error('Member is penalized');
    if (member.books.length >= 2) throw new Error('Member has already borrowed 2 books');

    const book = await this.booksRepository.findOne({ where: { code: bookCode } });
    if (!book) throw new Error('Book not found');
    if (book.member) throw new Error('Book is already borrowed by another member');

    book.member = member;
    book.borrowedAt = new Date();
    return this.booksRepository.save(book);
  }

  async returnBook(bookCode: string, memberCode: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { code: bookCode },
      relations: ['member'],
    });
    if (!book) throw new Error('Book not found');
    if (book.member?.code !== memberCode) throw new Error('Book was not borrowed by this member');

    const borrowedAt = book.borrowedAt;
    const now = new Date();
    if (borrowedAt && (now.getTime() - borrowedAt.getTime()) / (1000 * 60 * 60 * 24) > 7) {
      const member = await this.membersRepository.findOne({ where: { code: memberCode } });
      if (member) {
        member.isPenalized = true;
        member.penaltyUntil = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // Penalize for 3 days
        await this.membersRepository.save(member);
      }
    }

    book.member = null;
    book.borrowedAt = null;
    return this.booksRepository.save(book);
  }

  async findAllBooks(): Promise<Book[]> {
    return this.booksRepository.find();
  }
}
