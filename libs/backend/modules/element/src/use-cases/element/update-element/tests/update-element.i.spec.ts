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
import { GetElementInput } from '../../get-element'
import {
  GetElementGql,
  GetElementQuery,
} from '../../get-element/tests/get-element.api.graphql'
import { UpdateElementInput } from '../update-element.input'
import {
  UpdateElementGql,
  UpdateElementMutation,
} from './update-element.api.graphql'

describe('UpdateElement', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let updateElementInput: UpdateElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const results = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createElementInput)

    elementId = results.createElement.id

    expect(elementId).toBeDefined()

    updateElementInput = {
      id: elementId,
      data: {
        name: 'Example Element updated',
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update an element', async () => {
      await domainRequest(guestApp, UpdateElementGql, updateElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an element', async () => {
      await domainRequest<UpdateElementInput, UpdateElementMutation>(
        userApp,
        UpdateElementGql,
        updateElementInput,
      )

      const { getElement: element } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, { elementId })

      expect(element).toMatchObject({
        ...updateElementInput.data,
        id: updateElementInput.id,
      })
    })
  })
})
