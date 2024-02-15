import {
  ImportApiHandler,
  ImportSystemTypesCommand,
  SeedSystemTypesCommand,
  SeedSystemTypesHandler,
  TypeApplicationModule,
  TypeSeederService,
} from '@codelab/backend/application/type'
import type { AppRepository } from '@codelab/backend/domain/app'
import { AppDomainModule } from '@codelab/backend/domain/app'
import { AtomDomainModule, AtomRepository } from '@codelab/backend/domain/atom'
import { PageDomainModule, PageRepository } from '@codelab/backend/domain/page'
import {
  InterfaceType,
  InterfaceTypeRepository,
  TypeDomainModule,
} from '@codelab/backend/domain/type'
import type { UserDomainService } from '@codelab/backend/domain/user'
import { UserRepository } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { CommandBus } from '@nestjs/cqrs'
import { ImportAtomHandler } from './import-atom.command.service'
import {
  ImportAtomsCommand,
  ImportAtomsHandler,
} from './import-atoms.command.service'

describe('ImportAtomsCommand', () => {
  let commandBus: CommandBus
  let atomRepository: AtomRepository
  let interfaceTypeRepository: InterfaceTypeRepository

  const context = initUserContext({
    imports: [AtomDomainModule, TypeDomainModule, TypeApplicationModule],
    providers: [
      ImportAtomHandler,
      ImportAtomsHandler,
      ImportApiHandler,
      SeedSystemTypesHandler,
      TypeSeederService,
    ],
  })

  beforeAll(async () => {
    const ctx = await context

    await ctx.beforeAll()

    commandBus = ctx.commandBus
    atomRepository = ctx.module.get(AtomRepository)
    interfaceTypeRepository = ctx.module.get(InterfaceTypeRepository)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('can import atoms', async () => {
    const importSystemTypesCommand = new ImportSystemTypesCommand()

    const importAtomsCommand = new ImportAtomsCommand([
      IAtomType.AntDesignButton,
    ])

    await commandBus.execute(importSystemTypesCommand)
    await commandBus.execute(importAtomsCommand)

    const atoms = await atomRepository.find()

    const api = await interfaceTypeRepository.findOne({
      name: InterfaceType.createName(IAtomType.AntDesignButton),
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

    expect(api?.fields).toHaveLength(13)
  })
})
