import { ApolloClient } from '@apollo/client'
import { INestApplication } from '@nestjs/common'
import { getApolloClient } from '../../../../../../../frontend/src/model/store/apollo/apolloClient'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { RegisterUserGql } from '@codelab/generated'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('RegisterUserUseCase', () => {
  let app: INestApplication
  let apolloClient: ApolloClient<any>

  const mutateCreateUser = () =>
    apolloClient.mutate({
      mutation: RegisterUserGql,
      variables: {
        input: {
          email,
          password,
        },
      },
    })

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule)

    const testPort = 4444

    apolloClient = getApolloClient({
      graphqlUri: `http://localhost:${testPort}/graphql`,
    })

    await app.listen(testPort, 'localhost', () => {
      console.log(`Test server listening at http://localhost:${testPort}`)
    })
  })

  afterAll(async () => {
    await teardownTestModule(app)
    await apolloClient.stop()
  })

  it('is true', () => {
    expect(true).toBeTruthy()
  })

  it('should create a user', async () => {
    const r = await mutateCreateUser()

    expect(!r.errors || r.errors.length === 0).toBeTruthy()
    expect(r.data && r.data.registerUser).toBeTruthy()
    expect(r.data.registerUser.email).toEqual(email)
    expect(r.data.registerUser.password).toBeFalsy()
  })

  it('should raise an error given an existing email', async () => {
    await expect(() => mutateCreateUser()).rejects.toThrow(
      `The email ${email} associated for this account already exists`,
    )
  })
})
