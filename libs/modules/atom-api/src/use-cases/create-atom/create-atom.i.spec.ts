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
  AtomType,
  CreateAtomGql,
  CreateAtomMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'
import { createAtom } from '../../helpers/create-atom'

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
          label: 'Button (Ant Design)',
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
})
