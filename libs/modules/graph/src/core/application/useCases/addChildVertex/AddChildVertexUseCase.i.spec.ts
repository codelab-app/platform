import { INestApplication } from '@nestjs/common'
import { VertexType } from '@prisma/client'
import { print } from 'graphql'
import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  AddChildVertexGql,
  CreateAppGql,
  CreatePageGql,
  RegisterUserGql,
} from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('AddChildVertexUseCase', () => {
  let app: INestApplication
  let user: User
  let page

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

  it('should create 2 vertices and link them using edge', async () => {
    const title = 'Test App'
    const createApp: App = await request(app.getHttpServer())
      .set('Authorization', `Bearer ${user.accessToken}`)
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

    page = await request(app.getHttpServer())
      .set('Authorization', `Bearer ${user.accessToken}`)
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
      .then((res) => res.body.data.createPage)

    const parentVertexId = page.graphs[0].vertices[0].id

    const addChildVertexWithParent = await request(app.getHttpServer())
      .send({
        query: print(AddChildVertexGql),
        variables: {
          input: {
            order: 0,
            parentVertexId,
            vertex: {
              type: 'React_Text',
              props: {
                id: 'a',
              },
            },
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const vertex = res.body.data.addChildVertex

        expect(vertex).toMatchObject({
          id: vertex.id,
          type: VertexType.React_Text,
          props: {
            id: 'a',
          },
        })
      })
  })
})
