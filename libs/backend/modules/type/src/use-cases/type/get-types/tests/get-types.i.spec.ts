import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { CreateTypeInput } from '../../create-type'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from '../../create-type/tests/create-type.api.graphql.gen'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { GetTypesInput } from '../get-types.input'
import { TestGetTypesGql, TestGetTypesQuery } from './get-types.api.graphql.gen'

describe('GetTypes', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let typeId: string
  let getTypesByIdInput: GetTypesInput
  let getTypesByKindInput: GetTypesInput
  let getTypesByNameInput: GetTypesInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })

    const { createType } = await domainRequest<
      CreateTypeInput,
      TestCreateTypeMutation
    >(userApp, TestCreateTypeGql, createPrimitiveStringInput)

    typeId = createType.id
    getTypesByIdInput = { byIds: { typeIds: [typeId] } }

    getTypesByKindInput = {
      byKind: { kind: createPrimitiveStringInput.typeKind },
    }
    getTypesByNameInput = { byName: { name: createPrimitiveStringInput.name } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get type', async () => {
      await domainRequest<GetTypesInput>(
        guestApp,
        TestGetTypesGql,
        getTypesByIdInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get types by id', async () => {
      const { getTypes } = await domainRequest<
        GetTypesInput,
        TestGetTypesQuery
      >(userApp, TestGetTypesGql, getTypesByIdInput)

      const type = getTypes[0] || {}

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        typeKind: createPrimitiveStringInput.typeKind,
      })
    })

    it('should get types by primitive kind', async () => {
      const { getTypes } = await domainRequest<
        GetTypesInput,
        TestGetTypesQuery
      >(userApp, TestGetTypesGql, getTypesByKindInput)

      const type = getTypes[0] || {}

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        typeKind: createPrimitiveStringInput.typeKind,
      })
    })

    it('should get types by name', async () => {
      const { getTypes } = await domainRequest<
        GetTypesInput,
        TestGetTypesQuery
      >(userApp, TestGetTypesGql, getTypesByNameInput)

      const type = getTypes[0] || {}

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        typeKind: createPrimitiveStringInput.typeKind,
      })
    })
  })
})
