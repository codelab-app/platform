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
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import {
  DatabaseService,
  Neo4jModule,
} from '@codelab/backend/infra/adapter/neo4j'
import { initUserContext } from '@codelab/backend/test'
import type { IApp, IAtom } from '@codelab/shared/abstract/core'
import { CommandBus } from '@nestjs/cqrs'

describe('DatabaseService', () => {
  const context = initUserContext({
    imports: [
      AppApplicationModule,
      AtomApplicationModule,
      TypeApplicationModule,
      Neo4jModule,
    ],
    providers: [],
  })

  let commandBus: CommandBus
  let databaseService: DatabaseService
  let atomRepository: AtomRepository
  let interfaceTypeRepository: InterfaceTypeRepository

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    commandBus = module.get(CommandBus)
    databaseService = module.get(DatabaseService)
    atomRepository = module.get(AtomRepository)
    interfaceTypeRepository = module.get(InterfaceTypeRepository)

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

    // const atoms = await atomRepository.find()
    const types = await interfaceTypeRepository.find()

    await databaseService.resetUserData()

    const typesAfter = await interfaceTypeRepository.find()

    expect(types.length).toBe(typesAfter.length)

    // const atomsAfter = await atomRepository.find()

    // expect(atoms.length).toBe(atomsAfter.length)
  })
})
