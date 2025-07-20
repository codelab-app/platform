import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { SeedE2eTagsCommand } from './use-case'

@Controller('tag')
export class TagApplicationController {
  constructor(private commandBus: CommandBus) {}

  @Post('seed-e2e-tag')
  @UseInterceptors(ClassSerializerInterceptor)
  seedApp() {
    return this.commandBus.execute(new SeedE2eTagsCommand())
  }
}
