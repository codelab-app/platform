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
  ElementFragment,
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
  let element: ElementFragment
  let updateElementInput: UpdateElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const results = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createElementInput)

    element = results.createElement
    updateElementInput = {
      elementId: element.id,
      updateData: {
        name: 'Example Element updated',
      },
    }

    expect(element.id).toBeDefined()
    expect(element).toMatchObject(createElementInput)
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
      const results = await domainRequest<
        UpdateElementInput,
        UpdateElementMutation
      >(userApp, UpdateElementGql, updateElementInput)

      expect(results.updateElement).toMatchObject({
        ...updateElementInput.updateData,
        id: updateElementInput.elementId,
      })
    })
  })
})
