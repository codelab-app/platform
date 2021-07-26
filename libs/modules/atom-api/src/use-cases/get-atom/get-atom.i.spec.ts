import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AtomFragment,
  GetAtomGql,
  GetAtomQueryResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom } from '../../helpers/create-atom'

describe('GetAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atom: __AtomFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
    atom = await createAtom(userApp)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get an atom', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(GetAtomGql),
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
  })

  describe('User', () => {
    it('should get an atom ', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(GetAtomGql),
          variables: {
            input: {
              atomId: atom.id,
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<GetAtomQueryResult>) => {
          const responseAtom = res.body.data?.atom

          expect(responseAtom).toMatchObject({
            id: atom.id,
            label: 'Button (Ant Design)',
            type: 'AntDesignButton',
          })

          expect(responseAtom?.propTypes).toBeTruthy()
          expect(responseAtom?.propTypes.name).toBeTruthy()
          expect(responseAtom?.propTypes.id).toBeTruthy()
        })
    })
  })
})
