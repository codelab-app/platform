import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { CreateTypeInput } from '../../create-type'
import {
  CreateTypeGql,
  CreateTypeMutation,
} from '../../create-type/tests/create-type.api.graphql'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { GetTypesInput } from '../get-types.input'
import { GetTypesGql } from './get-types.api.graphql'

describe('GetTypes', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let typeId: string
  let getTypesInput: GetTypesInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
    })

    const { createType } = await domainRequest<
      CreateTypeInput,
      CreateTypeMutation
    >(userApp, CreateTypeGql, createPrimitiveStringInput)

    typeId = createType.id
    getTypesInput = { byIds: { typeIds: [typeId] } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get type', async () => {
      await domainRequest<GetTypesInput>(guestApp, GetTypesGql, getTypesInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    // TODO: get types specs:
    // test get types byId
    // test get types byKind

    it('should get types', async () => {
      expect(true).toBeTruthy()
    })
  })
})
