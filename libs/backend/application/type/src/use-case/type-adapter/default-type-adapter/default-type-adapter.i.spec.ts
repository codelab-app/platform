import type { IUnionTypeDto } from '@codelab/shared-abstract-core'

import {
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  TypeDomainModule,
} from '@codelab/backend-domain-type'
import { initUserContext } from '@codelab/backend-test-setup'
import { Neo4jModule } from '@codelab/backend-infra-adapter-neo4j-driver'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared-abstract-core'

import { TypeApplicationModule } from '../../../type.application.module'
import { DefaultTypeAdapterService } from './default-type-adapter.service'

describe('DefaultTypeAdapterService', () => {
  let service: DefaultTypeAdapterService
  let primitiveTypeRepository: PrimitiveTypeRepository
  let interfaceTypeRepository: InterfaceTypeRepository

  const context = initUserContext({
    imports: [TypeApplicationModule, TypeDomainModule, Neo4jModule],
    providers: [DefaultTypeAdapterService],
  })

  const type = 'boolean | { delay: number }'

  const atom = {
    name: 'TestAtom',
  }

  const field = {
    key: 'testField',
  }

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    service = module.get(DefaultTypeAdapterService)
    primitiveTypeRepository = module.get(PrimitiveTypeRepository)
    interfaceTypeRepository = module.get(InterfaceTypeRepository)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should be an interfaceType', () => {
    const isInterfaceType = service.isInterfaceType(type)

    expect(isInterfaceType).toBeTruthy()
  })

  it.skip('should create a union type with boolean and interface type for given input', async () => {
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
