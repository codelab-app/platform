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
  AtomType,
  UpdateAtomGql,
  UpdateAtomMutationResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom } from '../../helpers/create-atom'

describe('UpdateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atom: __AtomFragment
  let updateVariables: any

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
    atom = await createAtom(userApp)
    updateVariables = {
      input: {
        id: atom.id,
        data: {
          label: 'Button updated (Ant Design)',
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
        .expect((res: ApiResponse<UpdateAtomMutationResult>) => {
          expect(res.body.data?.atom).toMatchObject({
            id: atom.id,
            label: 'Button updated (Ant Design)',
            type: AtomType.AntDesignButton,
          })
        })
    })
  })
})
