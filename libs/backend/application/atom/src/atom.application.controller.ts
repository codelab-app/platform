import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { ImportCypressAtomsCommand } from './use-case'

@Controller('atom')
export class AtomApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-atom')
  seedApp() {
    return this.commandBus.execute(new ImportCypressAtomsCommand())
  }
}
