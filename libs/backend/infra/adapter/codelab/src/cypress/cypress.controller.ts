import { CurrentUser } from '@codelab/backend/application/service'
import { type IAuth0User } from '@codelab/shared/abstract/core'
import { Controller, Get, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SeedAppCommand } from './seed-app.command.service'
import { SeedAtomCommand } from './seed-atom.command.service'
import { SeedTagCommand } from './seed-tag.command.service'
import { SeedTypeCommand } from './seed-type.command.service'

@Controller('/')
export class CypressController {
  constructor(private commandBus: CommandBus) {}

  @Post('app')
  seedApp() {
    return this.commandBus.execute(new SeedAppCommand())
  }

  @Post('atom')
  seedAtom() {
    return this.commandBus.execute(new SeedAtomCommand())
  }

  @Post('tag')
  seedTag() {
    return this.commandBus.execute(new SeedTagCommand())
  }

  @Post('type')
  seedType() {
    return this.commandBus.execute(new SeedTypeCommand())
  }
}
