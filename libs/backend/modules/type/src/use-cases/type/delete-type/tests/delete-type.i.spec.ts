import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { CreateTypeInput } from '../../create-type'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from '../../create-type/tests/create-type.api.graphql.gen'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { GetTypeInput } from '../../get-type/get-type.input'
import {
  TestGetTypeGql,
  TestGetTypeQuery,
} from '../../get-type/tests/get-type.api.graphql.gen'
import { DeleteTypeInput } from '../delete-type.input'
import { TestDeleteTypeGql } from './delete-type.api.graphql.gen'

describe('DeleteType', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let typeId: string
  let deleteTypeInput: DeleteTypeInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
    })

    const { createType } = await domainRequest<
      CreateTypeInput,
      TestCreateTypeMutation
    >(userApp, TestCreateTypeGql, createPrimitiveStringInput)

    typeId = createType.id
    deleteTypeInput = { typeId }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not delete type', async () => {
      await domainRequest<DeleteTypeInput>(
        guestApp,
        TestDeleteTypeGql,
        deleteTypeInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    // TODO: delete type specs:
    // - type doesn't get deleted if it's an API to an atom
    // - type doesn't get deleted if it's referenced in some fields
    // - make sure all fields are deleted when deleting interface

    it('should delete type', async () => {
      await domainRequest<DeleteTypeInput>(
        userApp,
        TestDeleteTypeGql,
        deleteTypeInput,
      )

      const type = await domainRequest<GetTypeInput, TestGetTypeQuery>(
        userApp,
        TestGetTypeGql,
        { where: { id: typeId } },
      )

      expect(type.getType).toBeNull()
    })
  })
})
