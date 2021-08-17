import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutation,
  DeleteTypeGql,
  DeleteTypeInput,
  GetTypeGql,
  GetTypeInput,
  GetTypeQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { createPrimitiveTypeStringInput } from '../../create-type/tests/create-type.data'

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
      CreateTypeMutation
    >(userApp, CreateTypeGql, createPrimitiveTypeStringInput)

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
        DeleteTypeGql,
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
        DeleteTypeGql,
        deleteTypeInput,
      )

      const type = await domainRequest<GetTypeInput, GetTypeQuery>(
        userApp,
        GetTypeGql,
        { where: { id: typeId } },
      )

      expect(type.getType).toBeNull()
    })
  })
})
