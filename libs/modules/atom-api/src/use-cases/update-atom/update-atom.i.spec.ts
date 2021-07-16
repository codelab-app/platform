import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  AtomType,
  UpdateAtomGql,
  UpdateAtomMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom, getAtom } from '../../helpers'

describe('UpdateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomId: string
  let updateVariables: UpdateAtomMutationVariables

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
    atomId = await createAtom(userApp).then((a) => a.id)
    updateVariables = {
      input: {
        id: atomId,
        data: {
          name: 'Button updated (Ant Design)',
          type: AtomType.AntDesignButton,
        },
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not update an atom', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(UpdateAtomGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should update atom for authorized user', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(UpdateAtomGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect(async () => {
          const atom = await getAtom(userApp, atomId)

          expect(atom).toMatchObject({
            id: atomId,
            name: 'Button updated (Ant Design)',
            type: AtomType.AntDesignButton,
          })
        })
    })
  })
})
