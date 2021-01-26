import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { teardownTestModule } from '../../../../../../../backend/src/common/utils/resetDb'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { RegisterUserGql } from '../registerUser/RegisterUser.generated'
import { DeleteUserGql } from './DeleteUser.generated'
import { setupTestModule } from '@codelab/backend'
import { User } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('DeleteUserUseCase', () => {
  let app: INestApplication
  let user: User

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule)

    // Create user
    user = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(RegisterUserGql),
        variables: {
          input: {
            email,
            password,
          },
        },
      })
      .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should delete an existing user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(DeleteUserGql),
        variables: {
          input: {
            email,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteUser.email).toEqual(email)
      })
  })

  it('Should return error when deleting non-existent user', async () => {
    const incorrectEmail = 'incorrect_email@codelab.ai'

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(DeleteUserGql),
        variables: {
          input: {
            email: incorrectEmail,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Theres no email ${incorrectEmail} associated with any account`,
        )
      })
  })
})
