import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { PrimitiveKind, Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { GetTypeInput } from '../../get-type'
import {
  TestGetTypeGql,
  TestGetTypeQuery,
} from '../../get-type/tests/get-type.api.graphql.gen'
import { CreateTypeInput } from '../create-type.input'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from './create-type.api.graphql.gen'
import {
  createInterfaceTypeInput,
  createPrimitiveStringInput,
} from './create-type.data'

describe('CreateType', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not create type', async () => {
      await domainRequest<CreateTypeInput>(
        guestApp,
        TestCreateTypeGql,
        createPrimitiveStringInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    // TODO add for other types

    it('should create a primitive type', async () => {
      const {
        createType: { id: typeId },
      } = await domainRequest<CreateTypeInput, TestCreateTypeMutation>(
        userApp,
        TestCreateTypeGql,
        createPrimitiveStringInput,
      )

      const { getType: type } = await domainRequest<
        GetTypeInput,
        TestGetTypeQuery
      >(userApp, TestGetTypeGql, { where: { id: typeId } })

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        primitiveKind: PrimitiveKind.String,
      })
    })

    it('should create interface type', async () => {
      const {
        createType: { id: typeId },
      } = await domainRequest<CreateTypeInput, TestCreateTypeMutation>(
        userApp,
        TestCreateTypeGql,
        createInterfaceTypeInput,
      )

      const { getType: type } = await domainRequest<
        GetTypeInput,
        TestGetTypeQuery
      >(userApp, TestGetTypeGql, { where: { id: typeId } })

      expect(type).toMatchObject({
        __typename: 'InterfaceType',
        name: createInterfaceTypeInput.name,
      })
    })
  })
})
