// members.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async findAllMembers(): Promise<Member[]> {
    return this.membersRepository.find({ relations: ['books'] });
  }
}
