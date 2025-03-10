import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { ImportE2eAtomsCommand } from './use-case'

@Controller('atom')
export class AtomApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-e2e-atom')
  seedApp() {
    return this.commandBus.execute(new ImportE2eAtomsCommand())
  }
}
