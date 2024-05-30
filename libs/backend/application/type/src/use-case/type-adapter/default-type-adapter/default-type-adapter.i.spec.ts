import {
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  TypeDomainModule,
} from '@codelab/backend/domain/type'
import { initUserContext } from '@codelab/backend/test'
import type { IUnionTypeDto } from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { Test, type TestingModule } from '@nestjs/testing'
import { TypeApplicationModule } from '../../../type.application.module'
import { DefaultTypeAdapterService } from './default-type-adapter.service'

describe.skip('DefaultTypeAdapterService', () => {
  const type = 'boolean | { delay: number }'
  let service: DefaultTypeAdapterService
  let primitiveTypeRepository: PrimitiveTypeRepository
  let interfaceTypeRepository: InterfaceTypeRepository

  const context = initUserContext({
    imports: [TypeApplicationModule, TypeDomainModule],
    providers: [],
  })

  const atom = {
    name: 'TestAtom',
  }

  const field = {
    key: 'testField',
  }

  beforeAll(async () => {
    const ctx = await context

    await ctx.beforeAll()

    service = ctx.module.get(DefaultTypeAdapterService)
    primitiveTypeRepository = ctx.module.get(PrimitiveTypeRepository)
    interfaceTypeRepository = ctx.module.get(InterfaceTypeRepository)

    // service = new DefaultTypeAdapterService({
    //   atom,
    //   field,
    //   owner: user,
    // })
  })

  it('should be an interfaceType', async () => {
    const isInterfaceType = service.isInterfaceType(type)

    expect(isInterfaceType).toBeTruthy()
  })

  it('should create a union type with boolean and interface type for given input', async () => {
    const result = (await service.execute({
      atom,
      field,
      type,
    })) as IUnionTypeDto

    expect(result).toBeDefined()
    expect(result.kind).toEqual(ITypeKind.UnionType)

    expect(result.typesOfUnionType.length).toEqual(2)

    const [booleanType, interfaceType] = result.typesOfUnionType
    const booleanTypeId = booleanType?.id
    const interfaceTypeId = interfaceType?.id

    const existingBooleanType = await primitiveTypeRepository.findOne({
      where: {
        id: booleanTypeId,
      },
    })

    const existingInterfaceType = await interfaceTypeRepository.findOne({
      where: {
        id: interfaceTypeId,
      },
    })

    expect(existingBooleanType?.primitiveKind).toEqual(
      IPrimitiveTypeKind.Boolean,
    )
    expect(existingInterfaceType?.kind).toEqual(ITypeKind.InterfaceType)

    const interfaceTypeFields = existingInterfaceType?.fields

    expect(interfaceTypeFields?.length).toEqual(1)

    const delayField = interfaceTypeFields?.[0]

    expect(delayField?.key).toEqual('delay')
    expect(delayField?.fieldType.kind).toEqual(IPrimitiveTypeKind.Number)
  })
})
