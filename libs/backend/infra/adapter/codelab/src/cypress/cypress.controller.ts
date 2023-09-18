import { SeedCypressAppCommand } from '@codelab/backend/application/app'
import { SeedCypressAtomsCommand } from '@codelab/backend/application/atom'
import { SeedCypressTagsCommand } from '@codelab/backend/application/tag'
import { SeedCypressTypesCommand } from '@codelab/backend/application/type'
import { Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

@Controller()
export class CypressController {
  constructor(private commandBus: CommandBus) {}

  @Post('app')
  seedApp() {
    return this.commandBus.execute(new SeedCypressAppCommand())
  }

  @Post('atom')
  seedAtom() {
    return this.commandBus.execute(new SeedCypressAtomsCommand())
  }

  @Post('tag')
  seedTag() {
    return this.commandBus.execute(new SeedCypressTagsCommand())
  }

  @Post('type')
  seedType() {
    return this.commandBus.execute(new SeedCypressTypesCommand())
  }
}
