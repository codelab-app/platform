import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  Auth0Service,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  DeleteAtomGql,
  DeleteAtomMutationResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom } from '../create-atom/create-atom.i.spec'

describe('Delete Atom', () => {
  let app: INestApplication
  let accessToken = ''
  let atom: any

  beforeAll(async () => {
    app = await setupTestModule(app, AtomModule)

    const auth0Service = app.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
    atom = await createAtom(accessToken, app)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should fail to delete atom for guest', async () => {
    await request(app.getHttpServer())
      .send({
        query: print(DeleteAtomGql),
        variables: {
          input: {
            atomId: atom.id,
          },
        },
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })

  it('should delete an atom for an authorized user', async () => {
    await request(app.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(DeleteAtomGql),
        variables: {
          input: {
            atomId: atom.id,
          },
        },
      })
      .expect(200)
      .expect((res: ApiResponse<DeleteAtomMutationResult>) => {
        expect(res.body.data?.deleteAtom).toMatchObject({
          id: atom.id,
        })
      })
  })
})
