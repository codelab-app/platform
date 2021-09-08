import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { UserModule } from '../../../user.module'
import { UpsertUserInput } from '../../upsert-user'
import {
  UpsertUserGql,
  UpsertUserMutation,
} from '../../upsert-user/tests/upsert-user.api.graphql.gen'
import { createUserInput } from '../../upsert-user/tests/upsert-user.data'
import { GetUserInput } from '../get-user.input'
import { GetUserGql, GetUserQuery } from './get-user.api.graphql.gen'

describe('GetUser', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let getUserInput: GetUserInput
  let createUserId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([UserModule], { role: Role.Guest })
    userApp = await setupTestModule([UserModule], { role: Role.User })

    const { upsertUser } = await domainRequest<
      UpsertUserInput,
      UpsertUserMutation
    >(userApp, UpsertUserGql, createUserInput)

    createUserId = upsertUser.id
    getUserInput = {
      id: createUserId,
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get a user', async () => {
      await domainRequest<GetUserInput, GetUserQuery>(
        guestApp,
        GetUserGql,
        getUserInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get a user by id', async () => {
      const { getUser } = await domainRequest<GetUserInput, GetUserQuery>(
        userApp,
        GetUserGql,
        getUserInput,
      )

      expect(getUser).toMatchObject({
        id: createUserId,
        auth0Id: createUserInput.data.auth0Id,
      })
    })

    it('should get a user by auth0Id', async () => {
      const { getUser } = await domainRequest<GetUserInput, GetUserQuery>(
        userApp,
        GetUserGql,
        {
          auth0Id: createUserInput.data.auth0Id,
        },
      )

      expect(getUser).toMatchObject({
        id: createUserId,
        auth0Id: createUserInput.data.auth0Id,
      })
    })
  })
})
