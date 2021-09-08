import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { createField } from '../../create-field/tests/create-type-field'
import { partialCreateFieldInput } from '../../create-field/tests/data'
import { GetFieldInput } from '../get-field.input'
import { TestGetFieldGql, TestGetFieldQuery } from './get-field.api.graphql.gen'

describe('GetField', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let fieldId: string
  let getFieldInput: GetFieldInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
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
      await domainRequest<GetFieldInput>(
        guestApp,
        TestGetFieldGql,
        getFieldInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get field', async () => {
      const { getField: field } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(userApp, TestGetFieldGql, getFieldInput)

      expect(field).toBeDefined()
      expect(field).toMatchObject(partialCreateFieldInput)
    })
  })
})
