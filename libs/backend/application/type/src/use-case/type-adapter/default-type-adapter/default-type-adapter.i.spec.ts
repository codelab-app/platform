import type { IUnionTypeDTO } from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { DefaultTypeAdapterService } from './default-type-adapter.service'

describe.skip('DefaultTypeAdapterService', () => {
  const type = 'boolean | { delay: number }'
  let service: DefaultTypeAdapterService

  beforeAll(() => {
    const atom = {
      name: 'TestAtom',
    }

    const field = {
      key: 'testField',
    }

    service = new DefaultTypeAdapterService({
      atom,
      field,
      owner: user,
    })
  })

  it('should be an interfaceType', async () => {
    const isInterfaceType = service.isInterfaceType(type)

    expect(isInterfaceType).toBeTruthy()
  })

  it('should create a union type with boolean and interface type for given input', async () => {
    const result = (await service.execute({ type })) as IUnionTypeDTO

    expect(result).toBeDefined()
    expect(result.kind).toEqual(ITypeKind.UnionType)

    expect(result.typesOfUnionType.length).toEqual(2)

    const [booleanType, interfaceType] = result.typesOfUnionType
    const booleanTypeId = booleanType?.id
    const interfaceTypeId = interfaceType?.id

    const existingBooleanType = await primitiveTypeRepository.findOne({
      id: booleanTypeId,
    })

    const existingInterfaceType = await interfaceTypeRepository.findOne({
      id: interfaceTypeId,
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
