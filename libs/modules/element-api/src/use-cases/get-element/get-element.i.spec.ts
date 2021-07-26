import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  ElementFragment,
  GetElementGql,
  GetElementQueryResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { ElementModule } from '../../element.module'
import { createTestElement } from '../../utils/testHelpers'

describe('Get Element', () => {
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
    it('should not get an element', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(GetElementGql),
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
    it('should get an element', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(GetElementGql),
          variables: {
            input: {
              elementId: element.id,
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<GetElementQueryResult>) => {
          const responseElement = res.body.data?.getElement

          expect(responseElement).toMatchObject({
            id: element.id,
            name: 'Example Element',
          })
        })
    })
  })
})
