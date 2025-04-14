import type { CommandBus } from '@nestjs/cqrs'

import { DataModule } from '@codelab/backend/application/data'
import {
  ImportSystemTypesCommand,
  TypeApplicationModule,
  TypeSeederService,
} from '@codelab/backend/application/type'
import { AtomDomainModule, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
  TypeDomainModule,
} from '@codelab/backend/domain/type'
import { initUserContext } from '@codelab/backend/test/setup'
import { IAtomType } from '@codelab/shared/abstract/core'

import { AtomApplicationService } from '../../services/atom.application.service'

describe('ImportAtoms', () => {
  let commandBus: CommandBus
  let atomRepository: AtomRepository
  let interfaceTypeRepository: InterfaceTypeRepository
  let atomApplicationService: AtomApplicationService

  const context = initUserContext({
    imports: [
      AtomDomainModule,
      TypeDomainModule,
      TypeApplicationModule,
      DataModule,
    ],
    providers: [TypeSeederService, AtomApplicationService],
  })

  beforeAll(async () => {
    const ctx = await context

    await ctx.beforeAll()

    commandBus = ctx.commandBus
    atomRepository = ctx.module.get(AtomRepository)
    interfaceTypeRepository = ctx.module.get(InterfaceTypeRepository)
    atomApplicationService = ctx.module.get(AtomApplicationService)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('can import atoms', async () => {
    const importSystemTypesCommand = new ImportSystemTypesCommand()

    await commandBus.execute(importSystemTypesCommand)

    await atomApplicationService.addAtomsFromTypes([IAtomType.AntDesignButton])

    const atoms = await atomRepository.find()

    const api = await interfaceTypeRepository.findOne({
      where: {
        name: InterfaceType.createName(IAtomType.AntDesignButton),
      },
    })

    expect(atoms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: IAtomType.AntDesignButton,
        }),
      ]),
    )

    expect(api).toEqual(
      expect.objectContaining({
        name: InterfaceType.createName(IAtomType.AntDesignButton),
      }),
    )

    expect(api?.fields).toHaveLength(16)
  })
})
