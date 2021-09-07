import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { UserModule } from '../../../user.module'
import { GetUserInput } from '../../get-user'
import {
  GetUserGql,
  GetUserQuery,
} from '../../get-user/tests/get-user.api.graphql.gen'
import { UpsertUserInput } from '../upsert-user.input'
import {
  UpsertUserGql,
  UpsertUserMutation,
} from './upsert-user.api.graphql.gen'
import { createUserInput } from './upsert-user.data'

describe('CreateUserUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let createdUserId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([UserModule], { role: Role.Guest })
    userApp = await setupTestModule([UserModule], { role: Role.User })

    const { upsertUser } = await domainRequest<
      UpsertUserInput,
      UpsertUserMutation
    >(userApp, UpsertUserGql, createUserInput)

    createdUserId = upsertUser.id
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a User', async () => {
      await domainRequest<UpsertUserInput, UpsertUserMutation>(
        guestApp,
        UpsertUserGql,
        createUserInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a user', async () => {
      const { getUser } = await domainRequest<GetUserInput, GetUserQuery>(
        userApp,
        GetUserGql,
        {
          id: createdUserId,
        },
      )

      expect(getUser).toMatchObject({
        id: createdUserId,
        auth0Id: createUserInput.data.auth0Id,
      })
    })

    it('should update a user', async () => {
      const updateUserInput: UpsertUserInput = {
        data: {
          auth0Id: 'new-id',
        },
        where: {
          id: createdUserId,
        },
      }

      await domainRequest<UpsertUserInput, UpsertUserMutation>(
        userApp,
        UpsertUserGql,
        updateUserInput,
      )

      const { getUser } = await domainRequest<GetUserInput, GetUserQuery>(
        userApp,
        GetUserGql,
        {
          id: createdUserId,
        },
      )

      expect(getUser).toMatchObject({
        id: createdUserId,
        auth0Id: 'new-id',
      })
    })
  })
})
