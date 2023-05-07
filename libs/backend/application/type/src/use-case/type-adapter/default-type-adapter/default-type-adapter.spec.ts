import { AdminService } from '@codelab/backend/domain/admin'
import {
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
} from '@codelab/backend/domain/type'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { resetDatabase } from '@codelab/backend/test'
import type { IUnionTypeDTO, IUserDTO } from '@codelab/frontend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { DefaultTypeAdapterService } from './default-type-adapter.service'

const primitiveTypeRepository = new PrimitiveTypeRepository()
const interfaceTypeRepository = new InterfaceTypeRepository()
let user: IUserDTO
const driver = getDriver()

beforeAll(async () => {
  user = await resetDatabase({
    AdminService,
    driver,
    User,
    UserRepository,
  })
})

afterAll(async () => {
  await driver.close()
})

describe('DefaultTypeAdapterService', () => {
  const atom = {
    name: 'TestAtom',
  }

  const field = {
    key: 'testField',
  }

  const service = new DefaultTypeAdapterService({
    atom,
    field,
    owner: user,
  })

  it('should create a union type with boolean and interface type for given input', async () => {
    const inputType = 'boolean | { delay: number }'
    const result = (await service.execute({ type: inputType })) as IUnionTypeDTO

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

    expect(existingBooleanType?.kind).toEqual(IPrimitiveTypeKind.Boolean)
    expect(existingInterfaceType?.kind).toEqual(ITypeKind.InterfaceType)

    const interfaceTypeFields = existingInterfaceType?.fields

    expect(interfaceTypeFields?.length).toEqual(1)

    const delayField = interfaceTypeFields?.[0]

    expect(delayField?.key).toEqual('delay')
    expect(delayField?.fieldType.kind).toEqual(IPrimitiveTypeKind.Number)
  })
})
