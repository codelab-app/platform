import { INestApplication } from '@nestjs/common'
import { VertexType } from '@prisma/client'
import { print } from 'graphql'
import request from 'supertest'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { CreateAppGql, RegisterUserGql } from '@codelab/generated'
import { App } from '@codelab/modules/app'
import { User } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('CreateAppUseCase', () => {
  let app: INestApplication
  let user: User

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule, AppModule)

    // user = await request(app.getHttpServer())
    //   .post('/graphql')
    //   .send({
    //     query: print(RegisterUserGql),
    //     variables: {
    //       input: {
    //         email,
    //         password,
    //       },
    //     },
    //   })
    //   .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('is true', () => {
    expect(true).toBeTruthy()
  })

  it.skip('should create an app for the an authenticated user', async () => {
    const title = 'My App'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
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
        const createdApp: App = res.body.data.createApp

        expect(createdApp).toMatchObject({
          title,
          pages: [
            {
              title: 'Home',
              graphs: [
                {
                  type: 'Layout',
                  label: 'Layout',
                  vertices: [
                    { type: VertexType.React_RGL_ResponsiveContainer },
                  ],
                },
              ],
            },
          ],
        })
      })
  })

  it.skip('should create not create an app for a guest user', async () => {
    const title = 'My App'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
      })
  })
})
