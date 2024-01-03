import type { IApp } from '@codelab/shared/abstract/core'
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SeedCypressAppCommand } from './use-case'

@Controller('data/app')
export class AppApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-app')
  async seedApp() {
    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  }
}
