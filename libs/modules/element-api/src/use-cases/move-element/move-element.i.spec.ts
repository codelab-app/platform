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
  MoveElementGql,
  MoveElementMutationResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { ElementModule } from '../../element.module'
import { createTestElement } from '../../utils/testHelpers'

describe('Move Element', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let rootElement: ElementFragment
  let parentElement1: ElementFragment
  let parentElement2: ElementFragment
  let childElement: ElementFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })
    rootElement = await createTestElement(userApp, 'Root Element')
    parentElement1 = await createTestElement(
      userApp,
      'Parent Element 1',
      rootElement.id,
    )
    parentElement2 = await createTestElement(
      userApp,
      'Parent Element 2',
      rootElement.id,
    )
    childElement = await createTestElement(
      userApp,
      'Child Element',
      parentElement1.id,
    )
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to move element', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(MoveElementGql),
          variables: {
            input: {
              elementId: childElement.id,
              moveData: {
                parentElementId: parentElement2.id,
                order: 1,
              },
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
    it('should move element for an authorized user', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(MoveElementGql),
          variables: {
            input: {
              elementId: childElement.id,
              moveData: {
                parentElementId: parentElement2.id,
                order: 1,
              },
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<MoveElementMutationResult>) => {
          expect(res.body.data?.moveElement).toMatchObject({
            id: childElement.id,
            name: childElement.name,
          })
        })
    })
  })
})
