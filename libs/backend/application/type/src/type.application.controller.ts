import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { SeedE2eTypesCommand } from './use-case'

@Controller('type')
export class TypeApplicationController {
  constructor(private commandBus: CommandBus) {}

  @Post('seed-e2e-type')
  @UseInterceptors(ClassSerializerInterceptor)
  seedApp() {
    return this.commandBus.execute<SeedE2eTypesCommand>(
      new SeedE2eTypesCommand(),
    )
  }
}
