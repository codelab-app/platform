import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import {
  createTestApp,
  createTestStyle,
  createTestUser,
  setupStyleTestModule,
} from '../../testUtils'
import { request, teardownTestModule } from '@codelab/backend'
import {
  AddChildVertexGql,
  App,
  AssignStyleGql,
  CreatePageGql,
  GetVertexGql,
  UnAssignStyleGql,
} from '@codelab/generated'
import { User } from '@codelab/modules/user'

describe('AssignStyleUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let app: App

  const assign = (
    vertexId: string,
    styleId: string,
    accessToken = user.accessToken,
  ) =>
    request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(AssignStyleGql),
        variables: {
          input: {
            styleId,
            vertexId,
          },
        },
      })
      .expect(200)
      .then((res) => res.body.data.assignStyle)

  const unassign = (
    vertexId: string,
    styleId: string,
    accessToken = user.accessToken,
  ) =>
    request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(UnAssignStyleGql),
        variables: {
          input: {
            styleId,
            vertexId,
          },
        },
      })
      .expect(200)
      .then((res) => res.body.data.unAssignStyle)

  const createVertex = async (accessToken = user.accessToken) => {
    const page = await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Test Page',
            appId: app.id,
          },
        },
      })
      .expect(200)
      .then((res) => res.body.data.createPage)

    const parentVertexId = page.graphs[0].vertices[0].id

    return await request(nestApp.getHttpServer())
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
      .then((res) => res.body.data.addChildVertex)
  }

  beforeAll(async () => {
    nestApp = await setupStyleTestModule(nestApp)
    user = await createTestUser(nestApp)
  })

  beforeEach(async () => {
    app = await createTestApp(nestApp, user.accessToken)
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should unassign a style to a vertex', async () => {
    const vertex = await createVertex()
    const style = await createTestStyle(
      nestApp,
      app.id,
      { color: 'black' },
      user.accessToken,
    )

    await assign(vertex.id, style.id)
    await unassign(vertex.id, style.id)

    await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetVertexGql),
        variables: {
          input: {
            id: vertex.id,
          },
        },
      })
      .expect(200)
      .expect((r) => {
        expect(r.body.data.getVertex.styles[0]).toBeFalsy()
      })
  })
})
