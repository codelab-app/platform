import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { GetFieldInput } from '../../get-field'
import {
  TestGetFieldGql,
  TestGetFieldQuery,
} from '../../get-field/tests/get-field.api.graphql.gen'
import { CreateFieldInput } from '../create-field.input'
import {
  TestCreateFieldGql,
  TestCreateFieldMutation,
} from './create-field.api.graphql.gen'
import { createInterfaceType, createPrimitiveType } from './create-type-field'
import { partialCreateFieldInput } from './data'

describe('CreateField', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let createFieldInput: CreateFieldInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })

    const primitiveTypeId = await createPrimitiveType(userApp)
    const interfaceTypeId = await createInterfaceType(userApp)

    createFieldInput = {
      name: partialCreateFieldInput.name,
      key: partialCreateFieldInput.key as string,
      description: partialCreateFieldInput.description,
      interfaceId: interfaceTypeId,
      type: {
        existingTypeId: primitiveTypeId,
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not create field', async () => {
      await domainRequest<CreateFieldInput>(
        guestApp,
        TestCreateFieldGql,
        createFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should create field', async () => {
      const {
        createField: { id: fieldId },
      } = await domainRequest<CreateFieldInput, TestCreateFieldMutation>(
        userApp,
        TestCreateFieldGql,
        createFieldInput,
      )

      const { getField: field } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(userApp, TestGetFieldGql, { byId: { fieldId } })

      expect(field).toMatchObject({
        name: createFieldInput.name,
        key: createFieldInput.key,
        description: createFieldInput.description,
      })
    })
  })
})
