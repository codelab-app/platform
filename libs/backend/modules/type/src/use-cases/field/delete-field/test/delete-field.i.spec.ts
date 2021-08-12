import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  DeleteFieldGql,
  DeleteFieldInput,
  GetFieldGql,
  GetFieldInput,
  GetFieldQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { createField } from '../../create-field/helper/create-type-field'

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
