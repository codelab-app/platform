import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { CreateElementInput } from '../../create-element/create-element.input'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql.gen'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementGraphInput } from '../get-element-graph.input'
import {
  TestGetElementGraphGql,
  TestGetElementGraphQuery,
} from './get-element-graph.api.graphql.gen'

describe('GetElementGraph', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let getElementGraphInput: GetElementGraphInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })

    const results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createElementInput)

    elementId = results.createElement.id
    getElementGraphInput = { elementId }

    expect(elementId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get an element', async () => {
      await domainRequest(
        guestApp,
        TestGetElementGraphGql,
        getElementGraphInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get an element', async () => {
      const results = await domainRequest<
        GetElementGraphInput,
        TestGetElementGraphQuery
      >(userApp, TestGetElementGraphGql, getElementGraphInput)

      expect(results?.getElementGraph).toMatchObject({
        vertices: [
          {
            id: elementId,
            ...createElementInput,
          },
        ],
        edges: [],
      })
    })
  })
})
