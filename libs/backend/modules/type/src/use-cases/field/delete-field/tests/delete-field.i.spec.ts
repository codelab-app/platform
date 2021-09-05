import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { createField } from '../../create-field/tests/create-type-field'
import { GetFieldInput } from '../../get-field/get-field.input'
import {
  TestGetFieldGql,
  TestGetFieldQuery,
} from '../../get-field/tests/get-field.api.graphql.gen'
import { DeleteFieldInput } from '../delete-field.input'
import { TestDeleteFieldGql } from './delete-field.api.graphql.gen'

describe('DeleteField', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let fieldId: string
  let deleteFieldInput: DeleteFieldInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })

    fieldId = await createField(userApp)

    deleteFieldInput = { fieldId }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not delete field', async () => {
      await domainRequest<DeleteFieldInput>(
        guestApp,
        TestDeleteFieldGql,
        deleteFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should delete field', async () => {
      await domainRequest<DeleteFieldInput>(
        userApp,
        TestDeleteFieldGql,
        deleteFieldInput,
      )

      const { getField: field } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(userApp, TestGetFieldGql, { byId: { fieldId } })

      expect(field).toBeNull()
    })
  })
})
