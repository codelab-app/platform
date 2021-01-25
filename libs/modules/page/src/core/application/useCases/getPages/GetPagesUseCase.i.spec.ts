import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { AppDto } from '../../../../../../app/src/core/application/useCases/AppDto'
import { CreateAppGql } from '../../../../../../app/src/core/application/useCases/createApp/CreateApp.generated'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { PageModule } from '../../../../framework/nestjs/PageModule'
import { PageDto } from '../../../../presentation/PageDto'
import { CreatePageGql } from '../createPage/CreatePage.generated'
import { GetPagesGql } from './GetPages.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { UserDto, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetPagesUseCase', () => {
  let nestApp: INestApplication
  let user: UserDto
  let page: PageDto
  let app: AppDto

  beforeAll(async () => {
    nestApp = await setupTestModule(
      nestApp,
      PageModule,
      GraphModule,
      UserModule,
      AppModule,
    )

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

    const title = 'Test App'
    const { accessToken } = user

    app = await request(nestApp.getHttpServer())
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
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should retrieve pages for user', async () => {
    expect(true).toBeTruthy()

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 1')
      })

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 2',
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 2')
      })

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetPagesGql),
        variables: {
          input: {
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getPages.length).toEqual(2)
      })
  })
})
