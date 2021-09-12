import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { CreateTypeInput } from '../../create-type'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from '../../create-type/tests/create-type.api.graphql.gen'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { GetTypesInput } from '../get-types.input'
import { TestGetTypesGql } from './get-types.api.graphql.gen'

describe('GetTypes', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let typeId: string
  let getTypesInput: GetTypesInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })

    const { createType } = await domainRequest<
      CreateTypeInput,
      TestCreateTypeMutation
    >(userApp, TestCreateTypeGql, createPrimitiveStringInput)

    typeId = createType.id
    getTypesInput = { byIds: { typeIds: [typeId] } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get type', async () => {
      await domainRequest<GetTypesInput>(
        guestApp,
        TestGetTypesGql,
        getTypesInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it.todo('should get types by kind')

    it.todo('should get types by name')

    it.todo('should get types by typeIds')
  })
})
