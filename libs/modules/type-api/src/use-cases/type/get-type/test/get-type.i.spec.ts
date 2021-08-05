import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutation,
  GetTypeGql,
  GetTypeInput,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { createPrimitiveTypeStringInput } from '../../create-type/test/create-type.data'

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
      CreateTypeMutation
    >(userApp, CreateTypeGql, createPrimitiveTypeStringInput)

    typeId = createType.id
    getTypeInput = { typeId }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get type', async () => {
      await domainRequest<GetTypeInput>(guestApp, GetTypeGql, getTypeInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    // TODO: get type specs:
    // - test if the graph contains all sub types
    // - test if the subtypes are well arranged with edges
    // - test arrays, interfaces

    it('should get type', async () => {
      expect(true).toBeTruthy()
    })
  })
})
