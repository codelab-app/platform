import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateFieldGql,
  CreateFieldInput,
  CreateFieldMutation,
  GetFieldGql,
  GetFieldInput,
  GetFieldQuery,
  UpdateFieldGql,
  UpdateFieldInput,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import {
  createInterfaceType,
  createPrimitiveType,
} from '../../create-field/tests/create-type-field'
import { partialCreateFieldInput } from '../../create-field/tests/data'

describe('UpdateField', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let fieldId: string
  let updateFieldInput: UpdateFieldInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
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
      CreateFieldMutation
    >(userApp, CreateFieldGql, createFieldInput)

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
        UpdateFieldGql,
        updateFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should update field', async () => {
      await domainRequest<UpdateFieldInput>(
        userApp,
        UpdateFieldGql,
        updateFieldInput,
      )

      const { getField: field } = await domainRequest<
        GetFieldInput,
        GetFieldQuery
      >(userApp, GetFieldGql, { byId: { fieldId } })

      expect(field).toMatchObject({
        id: fieldId,
        name: updateFieldInput.updateData.name,
      })
    })
  })
})
