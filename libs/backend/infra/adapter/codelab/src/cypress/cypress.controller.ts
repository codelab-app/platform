import { CurrentUser } from '@codelab/backend/domain/user'
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

  @Get('/') test() {
    return 'Working'
  }

  @Post('app')
  seedApp(@CurrentUser() owner: IAuth0User) {
    return this.commandBus.execute(new SeedAppCommand(owner))
  }

  @Post('atom')
  seedAtom(@CurrentUser() owner: IAuth0User) {
    return this.commandBus.execute(new SeedAtomCommand(owner))
  }

  @Post('tag')
  seedTag(@CurrentUser() owner: IAuth0User) {
    return this.commandBus.execute(new SeedTagCommand(owner))
  }

  @Post('type')
  seedType(@CurrentUser() owner: IAuth0User) {
    return this.commandBus.execute(new SeedTypeCommand(owner))
  }
}
