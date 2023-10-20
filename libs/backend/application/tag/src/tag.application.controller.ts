import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SeedCypressTagsCommand } from './use-case'

@Controller('tag')
export class TagApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-tag')
  seedApp() {
    return this.commandBus.execute(new SeedCypressTagsCommand())
  }
}
