import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { AppDto } from '../../../../../../app/src/core/application/useCases/AppDto'
import { CreateAppGql } from '../../../../../../app/src/core/application/useCases/createApp/CreateApp.generated'
import { AppModule } from '../../../../../../app/src/framework/nestjs/AppModule'
import { GraphModule } from '../../../../../../graph/src/framework/nestjs/GraphModule'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { PageModule } from '../../../../framework/nestjs/PageModule'
import { CreatePageGql } from './CreatePage.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { UserDto } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('CreatePageUseCase', () => {
  let app: INestApplication
  let user: UserDto

  beforeAll(async () => {
    app = await setupTestModule(
      app,
      PageModule,
      GraphModule,
      UserModule,
      AppModule,
    )

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

  it('should return error for wrong app id', async () => {
    const wrongAppId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'
    const { accessToken } = user

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: wrongAppId,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(
          `The app with id ${wrongAppId} has not been found`,
        )
      })
  })

  it('should create page with graph and a root vertex', async () => {
    const title = 'Test App'
    const { accessToken } = user

    const createApp: AppDto = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title,
          },
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
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 1')
      })
  })
})
