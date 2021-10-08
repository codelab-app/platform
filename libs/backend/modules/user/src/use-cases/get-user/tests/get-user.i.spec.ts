// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupUserTestModule } from '../../../test/setupUserTestModule'
import { createUserInput } from '../../upsert-user/tests/upsert-user.data'
import { GetUserInput } from '../get-user.input'
import {
  TestGetUserGql,
  TestGetUserQuery,
} from './test-get-user.api.graphql.gen'

describe('GetUser', () => {
  const testModule = setupUserTestModule()
  let getUserInput: GetUserInput
  let createUserId: string

  beforeAll(async () => {
    const user = await testModule.upsertUser(createUserInput)

    createUserId = user.id
    getUserInput = {
      id: createUserId,
    }
  })

  describe('Guest', () => {
    it('should fail to get a user', async () => {
      await domainRequest<GetUserInput, TestGetUserQuery>(
        testModule.guestApp,
        TestGetUserGql,
        getUserInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get a user by id', async () => {
      const getUser = await testModule.getUser(getUserInput)

      expect(getUser).toMatchObject({
        id: createUserId,
        auth0Id: createUserInput.data.auth0Id,
      })
    })

    it('should get a user by auth0Id', async () => {
      const getUser = await testModule.getUser({
        auth0Id: createUserInput.data.auth0Id,
      })

      expect(getUser).toMatchObject({
        id: createUserId,
        auth0Id: createUserInput.data.auth0Id,
      })
    })
  })
})
