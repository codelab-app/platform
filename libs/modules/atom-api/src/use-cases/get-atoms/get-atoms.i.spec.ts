import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AtomFragment,
  GetAtomsGql,
  GetAtomsQueryResult,
} from '@codelab/codegen/graphql'
import { Auth0Service } from '@codelab/modules/auth-api'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom } from '../create-atom/create-atom.i.spec'

describe('GetAtoms', () => {
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

  it('should not get atoms for a guest', async () => {
    await request(app.getHttpServer())
      .send({
        query: print(GetAtomsGql),
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })

  it('should get atoms for authorized user', async () => {
    await request(app.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(GetAtomsGql),
      })
      .expect(200)
      .expect((res: ApiResponse<GetAtomsQueryResult>) => {
        const responseAtoms = res.body.data?.atoms as Array<__AtomFragment>

        expect(responseAtoms).toMatchObject([
          {
            id: atom.id,
            label: 'Button (Ant Design)',
            type: 'AntDesignButton',
          },
        ])

        expect(responseAtoms[0].propTypes).toBeTruthy()
        expect(responseAtoms[0].propTypes.name).toBeTruthy()
        expect(responseAtoms[0].propTypes.id).toBeTruthy()
      })
  })
})
