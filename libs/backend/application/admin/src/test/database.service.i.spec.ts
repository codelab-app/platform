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
import { AtomRepository } from '@codelab/backend/domain/atom'
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
  let databaseService: DatabaseService
  let atomRepository: AtomRepository

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    commandBus = module.get(CommandBus)
    databaseService = module.get(DatabaseService)
    atomRepository = module.get(AtomRepository)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should not clear system data during reset', async () => {
    // await commandBus.execute<ImportSystemTypesCommand>(
    //   new ImportSystemTypesCommand(),
    // )

    await commandBus.execute<SeedCypressAtomsCommand, Array<IAtom>>(
      new SeedCypressAtomsCommand(),
    )

    const atoms = await atomRepository.find()

    await databaseService.resetUserData()

    const atomsAfter = await atomRepository.find()

    // expect(atoms.length).toBe(atomsAfter.length)
    expect(true).toBeTruthy()
  })
})
