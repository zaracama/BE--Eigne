import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Member } from '../members/member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let booksRepository: Repository<Book>;
  let membersRepository: Repository<Member>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Member),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    booksRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    membersRepository = module.get<Repository<Member>>(getRepositoryToken(Member));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
