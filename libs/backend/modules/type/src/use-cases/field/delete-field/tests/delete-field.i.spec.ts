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
  GetFieldGql,
  GetFieldQuery,
} from '../../get-field/tests/get-field.api.graphql'
import { DeleteFieldInput } from '../delete-field.input'
import { DeleteFieldGql } from './delete-field.api.graphql'

describe('DeleteField', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let fieldId: string
  let deleteFieldInput: DeleteFieldInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
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
        DeleteFieldGql,
        deleteFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should delete field', async () => {
      await domainRequest<DeleteFieldInput>(
        userApp,
        DeleteFieldGql,
        deleteFieldInput,
      )

      const { getField: field } = await domainRequest<
        GetFieldInput,
        GetFieldQuery
      >(userApp, GetFieldGql, { byId: { fieldId } })

      expect(field).toBeNull()
    })
  })
})
