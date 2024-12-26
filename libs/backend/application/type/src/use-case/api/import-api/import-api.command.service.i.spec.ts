import type { CommandBus } from '@nestjs/cqrs'

import {
  DataModule,
  ReadAdminDataService,
} from '@codelab/backend/application/data'
import { InterfaceType, TypeDomainModule } from '@codelab/backend/domain/type'
import { initUserContext } from '@codelab/backend/test/setup'
import { IAtomType } from '@codelab/shared/abstract/core'
import { sortBy } from 'remeda'

import { TypeApplicationService } from '../../../service'
import { TypeApplicationModule } from '../../../type.application.module'
import { ImportSystemTypesCommand } from '../../system-types'
import { ImportApiCommand } from './import-api.command.service'

describe('ImportApiCommand', () => {
  let commandBus: CommandBus
  let readAdminDataService: ReadAdminDataService
  let typeApplicationService: TypeApplicationService

  const context = initUserContext({
    imports: [TypeDomainModule, TypeApplicationModule, DataModule],
    providers: [],
  })

  beforeAll(async () => {
    const ctx = await context

    commandBus = ctx.commandBus
    readAdminDataService = await ctx.module.resolve(ReadAdminDataService)
    typeApplicationService = ctx.module.get(TypeApplicationService)

    await ctx.beforeAll()

    const importSystemTypesCommand = new ImportSystemTypesCommand()

    await commandBus.execute(importSystemTypesCommand)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('can import api and fields', async () => {
    const buttonAtom = readAdminDataService.atoms.find(
      (atom) => atom.atom.type === IAtomType.AntDesignButton,
    )

    if (!buttonAtom) {
      throw new Error('Not found!')
    }

    await commandBus.execute(new ImportApiCommand(buttonAtom.api))

    const api = await typeApplicationService.getApiByAtomName(
      IAtomType.AntDesignButton,
    )

    const sortedApi = {
      ...api,
      fields: sortBy(api?.fields ?? [], (field) => field.key),
    }

    console.log(sortedApi)

    expect(sortedApi).toEqual(
      expect.objectContaining({
        fields: expect.arrayContaining(
          buttonAtom.api.fields.map((field) =>
            expect.objectContaining({
              ...field,
              fieldType: expect.objectContaining(field.fieldType),
            }),
          ),
        ),
        name: InterfaceType.createName(IAtomType.AntDesignButton),
      }),
    )
  })
})
