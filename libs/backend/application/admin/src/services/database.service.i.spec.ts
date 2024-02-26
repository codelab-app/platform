import {
  AppApplicationModule,
  SeedCypressAppCommand,
} from '@codelab/backend/application/app'
import {
  AtomApplicationModule,
  SeedCypressAtomsCommand,
} from '@codelab/backend/application/atom'
import {
  ImportSystemTypesCommand,
  TypeApplicationModule,
} from '@codelab/backend/application/type'
import { DatabaseService } from '@codelab/backend/domain/shared/modules'
import { initUserContext } from '@codelab/backend/test'
import type { IApp, IAtom } from '@codelab/shared/abstract/core'
import { CommandBus } from '@nestjs/cqrs'

describe('DatabaseService', () => {
  const context = initUserContext({
    imports: [
      AppApplicationModule,
      AtomApplicationModule,
      TypeApplicationModule,
    ],
    providers: [DatabaseService],
  })

  let commandBus: CommandBus

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    commandBus = module.get(CommandBus)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should not clear system data during reset', async () => {
    await commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    await commandBus.execute<SeedCypressAtomsCommand, Array<IAtom>>(
      new SeedCypressAtomsCommand(),
    )

    await commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  })
})
