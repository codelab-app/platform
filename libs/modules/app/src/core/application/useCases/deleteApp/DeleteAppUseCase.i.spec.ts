import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { User } from '../../../../../../user/src/presentation/User'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { App } from '../../../domain/App'
import { CreateAppGql } from '../createApp/CreateApp.generated'
import { DeleteAppGql } from './DeleteApp.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('DeleteAppUseCase', () => {
  let app: INestApplication
  let user: User

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule, AppModule)

    // Register user
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

  it('should delete app', async () => {
    const createApp: App = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreateAppGql),
        variables: {
          input: { title: 'Test App' },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual('Test App')
      })
      .then((res) => res.body.data.createApp)
    const { id } = createApp

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeleteAppGql),
        variables: {
          input: { id: id as string },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteApp.title).toEqual('Test App')
      })
  })

  it('should return error for wrong app id', async () => {
    const wrongAppId = '85e3fd3a-9dde-4c80-bd07-8cf126799698'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeleteAppGql),
        variables: {
          input: { id: wrongAppId },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`The app with id ${wrongAppId} was not found`)
      })
  })
})
