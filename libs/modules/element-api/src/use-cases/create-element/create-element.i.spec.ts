import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateElementGql,
  CreateElementMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { ElementModule } from '../../element.module'
import { createTestElement } from '../../utils/testHelpers'

describe('Create Element', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create element', async () => {
      const variables: CreateElementMutationVariables = {
        input: {
          name: 'Example Element',
        },
      }

      await request(guestApp.getHttpServer())
        .send({
          query: print(CreateElementGql),
          variables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should create an element', async () => {
      const result = await createTestElement(userApp, 'Example Element')

      expect(result).toMatchObject({
        name: 'Example Element',
      })
    })
  })
})
