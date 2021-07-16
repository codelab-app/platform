import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { GetAtomGql } from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom, getAtom } from '../../helpers'

describe('GetAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
    atomId = await createAtom(userApp).then((a) => a.id)
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
          variables: { input: { byId: { atomId } } },
        })

        // .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should get an atom ', async () => {
      const atom = await getAtom(userApp, atomId)

      expect(atom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })

      expect(atom?.api).toBeTruthy()
      expect(atom?.api.name).toBeTruthy()
      expect(atom?.api.id).toBeTruthy()
    })
  })
})
