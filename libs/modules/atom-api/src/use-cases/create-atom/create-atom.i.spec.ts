import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  Auth0Service,
  InfrastructureModule,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  AtomType,
  CreateAtomGql,
  CreateAtomMutation,
  CreateAtomMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'

export const createAtom = async (
  accessToken: string,
  app: INestApplication,
) => {
  const variables: CreateAtomMutationVariables = {
    input: {
      label: 'Button (Ant Design)',
      type: AtomType.AntDesignButton,
    },
  }

  const r = await request(app.getHttpServer())
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: print(CreateAtomGql),
      variables,
    })
    .expect(200)
    .then((res) => (res.body.data as CreateAtomMutation)?.createAtom)

  return r
}

describe('CreateAtom', () => {
  let app: INestApplication
  let accessToken = ''

  beforeAll(async () => {
    app = await setupTestModule(app, AtomModule)

    const auth0Service = app.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should fail to create atom for guest', async () => {
    const variables: CreateAtomMutationVariables = {
      input: {
        label: 'Button (Ant Design)',
        type: AtomType.AntDesignButton,
      },
    }

    await request(app.getHttpServer())
      .send({
        query: print(CreateAtomGql),
        variables,
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })

  it('should create an atom', async () => {
    const result: any = await createAtom(accessToken, app)

    expect(result).toMatchObject({
      label: 'Button (Ant Design)',
      type: AtomType.AntDesignButton,
    })

    // check if an propTypes interface is automatically created
    expect(result.propTypes).toBeTruthy()
    expect(result.propTypes.name).toBeTruthy()
    expect(result.propTypes.id).toBeTruthy()
  })
})
