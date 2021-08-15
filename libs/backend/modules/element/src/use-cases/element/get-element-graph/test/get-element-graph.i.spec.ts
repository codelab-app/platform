import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateElementGql,
  CreateElementInput,
  CreateElementMutation,
  GetElementGraphGql,
  GetElementGraphInput,
  GetElementGraphQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { createElementInput } from '../../create-element/test/create-element.data'

describe('GetElement', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let getElementGraphInput: GetElementGraphInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const results = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createElementInput)

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
      await domainRequest(guestApp, GetElementGraphGql, getElementGraphInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an element', async () => {
      const results = await domainRequest<
        GetElementGraphInput,
        GetElementGraphQuery
      >(userApp, GetElementGraphGql, getElementGraphInput)

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
