import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { SeedCypressTypesCommand } from './use-case'

@Controller('type')
export class TypeApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-type')
  seedApp() {
    return this.commandBus.execute<SeedCypressTypesCommand>(
      new SeedCypressTypesCommand(),
    )
  }
}
