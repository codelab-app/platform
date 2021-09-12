import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { CreateFieldInput } from '../../create-field'
import {
  TestCreateFieldGql,
  TestCreateFieldMutation,
} from '../../create-field/tests/create-field.api.graphql.gen'
import {
  createInterfaceType,
  createPrimitiveType,
} from '../../create-field/tests/create-type-field'
import { partialCreateFieldInput } from '../../create-field/tests/data'
import { GetFieldInput } from '../../get-field'
import {
  TestGetFieldGql,
  TestGetFieldQuery,
} from '../../get-field/tests/get-field.api.graphql.gen'
import { UpdateFieldInput } from '../update-field.input'
import { TestUpdateFieldGql } from './update-field.api.graphql.gen'

describe('UpdateField', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let fieldId: string
  let updateFieldInput: UpdateFieldInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })

    const primitiveTypeId = await createPrimitiveType(userApp)
    const interfaceTypeId = await createInterfaceType(userApp)

    const createFieldInput: CreateFieldInput = {
      name: partialCreateFieldInput.name!,
      key: partialCreateFieldInput.key!,
      description: partialCreateFieldInput.description,
      interfaceId: interfaceTypeId,
      type: {
        existingTypeId: primitiveTypeId,
      },
    }

    // Create a field
    const { createField } = await domainRequest<
      CreateFieldInput,
      TestCreateFieldMutation
    >(userApp, TestCreateFieldGql, createFieldInput)

    fieldId = createField.id

    // Prepare update field input
    updateFieldInput = {
      fieldId,
      updateData: {
        name: 'Updated Field Name',
        key: createFieldInput.key,
        type: createFieldInput.type,
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not update field', async () => {
      await domainRequest<UpdateFieldInput>(
        guestApp,
        TestUpdateFieldGql,
        updateFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should update field', async () => {
      await domainRequest<UpdateFieldInput>(
        userApp,
        TestUpdateFieldGql,
        updateFieldInput,
      )

      const { getField: field } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(userApp, TestGetFieldGql, { byId: { fieldId } })

      expect(field).toMatchObject({
        id: fieldId,
        name: updateFieldInput.updateData.name,
      })
    })
  })
})
