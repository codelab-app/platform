import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
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
import { createAtom } from '../../helpers'

describe('Delete Atom', () => {
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
    it('should fail to delete atom ', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(DeleteAtomGql),
          variables: { input: { atomId } },
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should delete an atom for an authorized user', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(DeleteAtomGql),
          variables: { input: { atomId } },
        })
        .expect(200)
        .expect((res: ApiResponse<DeleteAtomMutationResult>) => {
          expect(res.body.data?.deleteAtom).toBeNull()
        })
    })
  })
})
