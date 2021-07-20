import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  Auth0Service,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { Role } from '@codelab/backend/adapters'
import {
  __AtomFragment,
  GetAtomsGql,
  GetAtomsQueryResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom } from '../../helpers/create-atom'

describe('GetAtoms', () => {
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
    it('should not get atoms for a guest', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(GetAtomsGql),
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should get atoms for authorized user', async () => {
      await request(userApp.getHttpServer())
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
})
