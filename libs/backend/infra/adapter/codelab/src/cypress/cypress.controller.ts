import { SeedCypressAppCommand } from '@codelab/backend/application/app'
import { SeedCypressAtomsCommand } from '@codelab/backend/application/atom'
import { SeedCypressTagsCommand } from '@codelab/backend/application/tag'
import { SeedCypressTypesCommand } from '@codelab/backend/application/type'
import type { IApp } from '@codelab/shared/abstract/core'
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

@Controller()
export class CypressController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('app')
  seedApp() {
    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
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
