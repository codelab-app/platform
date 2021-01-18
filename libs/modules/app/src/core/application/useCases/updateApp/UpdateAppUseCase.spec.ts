import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import request from 'supertest'
import { Connection } from 'typeorm'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { AppDto } from '../AppDto'
import { CreateAppGql } from '../createApp/CreateApp.generated'
import { UpdateAppGql } from './UpdateApp.generated'
import { TestInfrastructureModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
import { UserDto, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const email2 = 'test_user2@codelab.ai'
const password = 'password'
const appTitleOld = 'My first app'

describe('UpdateAppUseCase', () => {
  let nestApp: INestApplication
  let connection: Connection
  let user: UserDto
  let app: AppDto

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, AppModule, UserModule],
    }).compile()

    nestApp = testModule.createNestApplication()
    connection = nestApp.get(Connection)
    await connection.synchronize(true)
    await nestApp.init()

    // Register user
    user = await request(nestApp.getHttpServer())
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

    // Create an app
    app = await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title: appTitleOld,
          },
        },
      })
      .then((res) => res.body.data.createApp)
  })

  afterAll(async () => {
    await nestApp.close()
  })

  it('should update an app for the authenticated user', async () => {
    const newTitle = 'My New App'

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(UpdateAppGql),
        variables: {
          input: {
            id: app.id,
            title: newTitle,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateApp.title).toEqual(newTitle)
      })
  })

  it('should not update an app for a guest user', async () => {
    const newTitle = 'My New App'

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', '')
      .send({
        query: print(UpdateAppGql),
        variables: {
          input: {
            id: app.id,
            title: newTitle,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
      })
  })

  it('should not update an app for another user', async () => {
    const newTitle = 'My New App'

    // Register user
    const user2 = await request(nestApp.getHttpServer())
      .post('/graphql')
      .send({
        query: print(RegisterUserGql),
        variables: {
          input: {
            email: email2,
            password,
          },
        },
      })
      .then((res) => res.body.data.registerUser)

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user2.accessToken}` ?? '')
      .send({
        query: print(UpdateAppGql),
        variables: {
          input: {
            id: app.id,
            title: newTitle,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].extensions.exception._tag).toBe(
          'REQUEST_VALIDATION_ERROR',
        )
      })
  })
})
