import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { UserModule } from '../../../user.module'
import { CreateUserInput } from '../create-user.input'
import {
  CreateUserGql,
  CreateUserMutation,
} from './create-user.api.graphql.gen'

describe('CreateUserUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let createUserInput: CreateUserInput

  beforeAll(async () => {
    guestApp = await setupTestModule([UserModule], { role: Role.Guest })
    userApp = await setupTestModule([UserModule], { role: Role.User })

    createUserInput = {
      auth0Id: 'some-id',
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a User', async () => {
      await domainRequest<CreateUserInput, CreateUserMutation>(
        guestApp,
        CreateUserGql,
        createUserInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  // describe('User', () => {
  //   it('should create a User', async () => {
  //     const { createUser } = await domainRequest<
  //       CreateUserInput,
  //       CreateUserMutation
  //     >(userApp, CreateUserGql, createUserInput)
  //
  //     expect(appId).toBeDefined()
  //
  //     const { getApp: app } = await domainRequest<GetUserInput, GetUserQuery>(
  //       userApp,
  //       GetAppGql,
  //       { byId: { appId } },
  //     )
  //
  //     expect(app).toMatchObject({ ...createAppInput, id: appId })
  //   })
  // })
})
