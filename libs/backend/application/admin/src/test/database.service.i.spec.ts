import type { IAtom } from '@codelab/shared/abstract/core'

import { AppApplicationModule } from '@codelab/backend/application/app'
import { AtomApplicationModule } from '@codelab/backend/application/atom'
import {
  ImportSystemTypesCommand,
  TypeApplicationModule,
} from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { initUserContext } from '@codelab/backend/test/setup'
import {
  DatabaseService,
  Neo4jModule,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { CommandBus } from '@nestjs/cqrs'

jest.setTimeout(90000)

describe('DatabaseService', () => {
  const context = initUserContext({
    imports: [
      AppApplicationModule,
      AtomApplicationModule,
      TypeApplicationModule,
      Neo4jModule,
    ],
  })

  let commandBus: CommandBus
  let databaseService: DatabaseService
  let interfaceTypeRepository: InterfaceTypeRepository

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    commandBus = module.get(CommandBus)
    databaseService = module.get(DatabaseService)
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

    const types = await interfaceTypeRepository.find()

    await databaseService.resetUserData()

    const typesAfter = await interfaceTypeRepository.find()

    expect(types.length).toBe(typesAfter.length)
  })
})
