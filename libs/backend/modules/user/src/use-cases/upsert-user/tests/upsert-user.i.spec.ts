// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  domainRequest,
  getDgraphProviderFromTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { setupUserTestModule } from '../../../test/setupUserTestModule'
import { UpsertUserInput } from '../upsert-user.input'
import {
  TestUpsertUserGql,
  TestUpsertUserMutation,
} from './test-upsert-user.api.graphql.gen'
import { createUserInput } from './upsert-user.data'

describe('CreateUserUseCase', () => {
  const testModule = setupUserTestModule()

  describe('Guest', () => {
    it('should fail to create a User', async () => {
      await domainRequest<UpsertUserInput, TestUpsertUserMutation>(
        testModule.guestApp,
        TestUpsertUserGql,
        createUserInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a user', async () => {
      const upsertUser = await testModule.upsertUser(createUserInput)

      const getUser = await testModule.getUser({
        id: upsertUser.id,
      })

      expect(getUser).toMatchObject({
        id: upsertUser.id,
        auth0Id: createUserInput.data.auth0Id,
      })
    })

    it('should update a user by id', async () => {
      await getDgraphProviderFromTestModule(testModule.userApp).resetData()

      const upsertUser = await testModule.upsertUser(createUserInput)

      const updateUserInput: UpsertUserInput = {
        data: {
          auth0Id: 'new-id',
          roles: [Role.User],
        },
        where: {
          id: upsertUser.id,
        },
      }

      const user = await testModule.upsertUser(updateUserInput)

      const matches = (actual: any) => {
        expect(actual).toMatchObject({
          id: upsertUser.id,
          auth0Id: 'new-id',
        })
      }

      matches(user)

      const getUser = await testModule.getUser({
        id: upsertUser.id,
      })

      matches(getUser)
    })

    it('should update a user by auth0Id', async () => {
      await getDgraphProviderFromTestModule(testModule.userApp).resetData()

      const upsertUser = await testModule.upsertUser(createUserInput)

      const updateUserInput: UpsertUserInput = {
        data: {
          auth0Id: 'new-id',
          roles: [Role.User],
        },
        where: {
          auth0Id: 'some-id',
        },
      }

      const user = await testModule.upsertUser(updateUserInput)

      const matches = (actual: any) => {
        expect(actual).toMatchObject({
          id: upsertUser.id,
          auth0Id: 'new-id',
        })
      }

      matches(user)

      const getUser = await testModule.getUser({
        id: upsertUser.id,
      })

      matches(getUser)
    })
  })
})
