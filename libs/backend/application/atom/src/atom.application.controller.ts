import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SeedCypressAtomsCommand } from './use-case'

@Controller('data/atom')
export class AtomApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-atom')
  seedApp() {
    return this.commandBus.execute(new SeedCypressAtomsCommand())
  }
}
