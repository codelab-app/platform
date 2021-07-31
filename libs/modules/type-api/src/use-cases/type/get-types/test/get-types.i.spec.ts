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
  GetTypesGql,
  GetTypesInput,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { createPrimitiveTypeStringInput } from '../../create-type/test/data'

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
    >(userApp, CreateTypeGql, createPrimitiveTypeStringInput)

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
