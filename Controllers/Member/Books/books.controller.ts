// books.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAllBooks();
  }

  @Post('borrow/:bookCode')
  borrowBook(
    @Param('bookCode') bookCode: string,
    @Body('memberCode') memberCode: string,
  ): Promise<Book> {
    return this.booksService.borrowBook(bookCode, memberCode);
  }

  @Post('return/:bookCode')
  returnBook(
    @Param('bookCode') bookCode: string,
    @Body('memberCode') memberCode: string,
  ): Promise<Book> {
    return this.booksService.returnBook(bookCode, memberCode);
  }
}
