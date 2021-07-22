import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { Role } from '@codelab/backend/adapters'
import {
  ElementFragment,
  UpdateElementGql,
  UpdateElementMutationResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { ElementModule } from '../../element.module'
import { createTestElement } from '../../utils/testHelpers'

describe('Update Element', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let element: ElementFragment
  let updateVariables: any

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })
    element = await createTestElement(userApp, 'Example Element')
    updateVariables = {
      input: {
        elementId: element.id,
        updateData: {
          name: 'Example Element updated',
        },
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not update an element', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(UpdateElementGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should update an element for authorized user', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(UpdateElementGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<UpdateElementMutationResult>) => {
          expect(res.body.data?.updateElement).toMatchObject({
            id: element.id,
            name: 'Example Element updated',
          })
        })
    })
  })
})
