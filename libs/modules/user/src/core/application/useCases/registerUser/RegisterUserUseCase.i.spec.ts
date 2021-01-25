import { ApolloClient } from '@apollo/client'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { getApolloClient } from '../../../../../../../frontend/src/model/store/apollo/apolloClient'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { RegisterUserGql } from './RegisterUser.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('RegisterUserUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let apolloClient: ApolloClient<any>

  // Helper functions

  const mutateCreateUser = () => {
    return apolloClient.mutate({
      mutation: RegisterUserGql,
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }

  // Setup

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    const testPort = 4444

    apolloClient = getApolloClient({
      graphqlUri: `http://localhost:${testPort}/graphql`,
    })

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()

    await app.listen(testPort, 'localhost', () => {
      console.log(`Test server listening at http://localhost:${testPort}`)
    })
  })

  afterAll(async () => {
    await app.close()
    await apolloClient.stop()
  })

  // Tests

  it('should create a user', async () => {
    const r = await mutateCreateUser()

    expect(!r.errors || r.errors.length === 0).toBeTruthy()
    expect(r.data && r.data.registerUser).toBeTruthy()
    expect(r.data.registerUser.email).toEqual(email)
    expect(r.data.registerUser.password).toBeFalsy()
  })

  it('should raise an error given an existing email', async () => {
    // Create a user
    await mutateCreateUser()

    // Create another user with the same email
    await expect(() => mutateCreateUser()).rejects.toThrow(
      `The email ${email} associated for this account already exists`,
    )
  })
})
