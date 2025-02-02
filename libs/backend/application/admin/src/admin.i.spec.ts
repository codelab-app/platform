import { DataModule } from '@codelab/backend/application/data'
import {
  ImportSystemTypesHandler,
  TypeApplicationModule,
} from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  InterfaceTypeRepository,
  TypeDomainModule,
} from '@codelab/backend/domain/type'
import { UserRepository } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test/setup'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { IAtomType } from '@codelab/shared/abstract/core'

import { AdminApplicationModule } from './admin.application.module'
import { SeederApplicationService } from './use-case'

/**
 * Here we show how to mock a user
 */
describe('Admin', () => {
  let userRepository: UserRepository
  let atomRepository: AtomRepository
  let interfaceTypeRepository: InterfaceTypeRepository
  let seederApplicationService: SeederApplicationService

  const context = initUserContext({
    imports: [
      AdminApplicationModule,
      DataModule,
      TypeDomainModule,
      TypeApplicationModule,
      Neo4jModule,
    ],
    providers: [
      AuthDomainService,
      ImportSystemTypesHandler,
      UserRepository,
      AtomRepository,
      InterfaceTypeRepository,
    ],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    seederApplicationService = module.get(SeederApplicationService)
    userRepository = module.get(UserRepository)
    atomRepository = module.get(AtomRepository)
    interfaceTypeRepository = module.get(InterfaceTypeRepository)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('fetch dependent types for an element', async () => {
    await seederApplicationService.seedDataForElementDependentTypesResolver()

    /**
     * First seed all the data
     */
    const users = await userRepository.find()
    const atoms = await atomRepository.find()
    const types = await interfaceTypeRepository.find()

    expect(users.length).toBe(1)
    expect(atoms.length).toBe(1)

    // We only seed 1 atom, so only 1 api type
    expect(types.length).toBe(1)
    expect(types[0]?.name).toBe(`${IAtomType.AntDesignButton} API`)
  })
})
