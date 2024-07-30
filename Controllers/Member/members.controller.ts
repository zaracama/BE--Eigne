// members.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MembersService } from '../../Services/members.service';
import { Member } from './member.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAllMembers();
  }
}
