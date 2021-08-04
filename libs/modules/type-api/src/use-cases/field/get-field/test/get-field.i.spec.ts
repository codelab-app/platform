import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  GetFieldGql,
  GetFieldInput,
  GetFieldQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { createField } from '../../create-field/helper/create-type-field'
import { partialCreateFieldInput } from '../../create-field/helper/data'

describe('GetField', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let fieldId: string
  let getFieldInput: GetFieldInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
    })

    fieldId = await createField(userApp)

    getFieldInput = { byId: { fieldId } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get field', async () => {
      await domainRequest<GetFieldInput>(guestApp, GetFieldGql, getFieldInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get field', async () => {
      const { getField: field } = await domainRequest<
        GetFieldInput,
        GetFieldQuery
      >(userApp, GetFieldGql, getFieldInput)

      expect(field).toBeDefined()
      expect(field).toMatchObject(partialCreateFieldInput)
    })
  })
})
