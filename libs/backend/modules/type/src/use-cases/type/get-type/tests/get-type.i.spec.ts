import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { CreateTypeInput } from '../../create-type/create-type.input'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from '../../create-type/tests/create-type.api.graphql.gen'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { GetTypeInput } from '../get-type.input'
import { TestGetTypeGql } from './get-type.api.graphql.gen'

describe('GetType', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let typeId: string
  let getTypeInput: GetTypeInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
    })

    const { createType } = await domainRequest<
      CreateTypeInput,
      TestCreateTypeMutation
    >(userApp, TestCreateTypeGql, createPrimitiveStringInput)

    typeId = createType.id
    getTypeInput = { where: { id: typeId } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get type', async () => {
      await domainRequest<GetTypeInput>(
        guestApp,
        TestGetTypeGql,
        getTypeInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    // TODO: get type specs:
    // - test if the graph contains all sub types
    // - test if the subtypes are well arranged with edges
    // - test arrays, interfaces

    it('should create a string', async () => {
      expect(true).toBeTruthy()
    })
  })
})
