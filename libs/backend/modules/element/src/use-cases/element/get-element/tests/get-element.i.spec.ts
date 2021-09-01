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
  CreateElementGql,
  CreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementInput } from '../get-element.input'
import { GetElementGql, GetElementQuery } from './get-element.api.graphql'

describe('GetElement', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let getElementInput: GetElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const results = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createElementInput)

    elementId = results.createElement.id
    getElementInput = { elementId }

    expect(elementId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get an element', async () => {
      await domainRequest(guestApp, GetElementGql, getElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an element', async () => {
      const results = await domainRequest<GetElementInput, GetElementQuery>(
        userApp,
        GetElementGql,
        getElementInput,
      )

      expect(results?.getElement).toMatchObject({
        ...createElementInput,
        id: elementId,
      })
    })
  })
})
