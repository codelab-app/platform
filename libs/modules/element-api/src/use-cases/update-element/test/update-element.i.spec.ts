import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateElementGql,
  CreateElementInput,
  CreateElementMutation,
  GetElementGraphGql,
  GetElementGraphInput,
  GetElementGraphQuery,
  UpdateElementGql,
  UpdateElementInput,
  UpdateElementMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../element.module'
import { createElementInput } from '../../create-element/test/create-element.data'

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
      elementId,
      updateData: {
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
        GetElementGraphInput,
        GetElementGraphQuery
      >(userApp, GetElementGraphGql, { elementId })

      expect(element).toMatchObject({
        ...updateElementInput.updateData,
        id: updateElementInput.elementId,
      })
    })
  })
})
