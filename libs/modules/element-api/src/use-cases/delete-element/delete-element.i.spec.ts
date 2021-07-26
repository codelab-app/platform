import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  DeleteElementGql,
  DeleteElementMutationResult,
  ElementFragment,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { ElementModule } from '../../element.module'
import { createTestElement } from '../../utils/testHelpers'

describe('Delete Element', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let element: ElementFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })
    element = await createTestElement(userApp, 'Example Element')
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete element', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(DeleteElementGql),
          variables: {
            input: {
              elementId: element.id,
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
    it('should delete an element for an authorized user', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(DeleteElementGql),
          variables: {
            input: {
              elementId: element.id,
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<DeleteElementMutationResult>) => {
          expect(res.body.data?.deleteElement).toMatchObject({ affected: 1 })
        })
    })
  })
})
