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
  CreateAtomGql,
  CreateAtomMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom, getAtom } from '../../helpers'

describe('CreateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create an atom', async () => {
      const variables: CreateAtomMutationVariables = {
        input: {
          name: 'Button (Ant Design)',
          type: AtomType.AntDesignButton,
        },
      }

      await request(guestApp.getHttpServer())
        .send({
          query: print(CreateAtomGql),
          variables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should create an atom', async () => {
      const result = await createAtom(userApp)

      expect(result.id).toBeTruthy()

      const atom = await getAtom(userApp, result.id)

      expect(atom).toMatchObject({
        name: 'Button (Ant Design)',
        type: AtomType.AntDesignButton,
      })

      // check if an propTypes interface is automatically created
      expect(atom?.api).toBeTruthy()
      expect(atom?.api.name).toBeTruthy()
      expect(atom?.api.id).toBeTruthy()
    })
  })
})
