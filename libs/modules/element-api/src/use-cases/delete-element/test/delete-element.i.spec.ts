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
  DeleteElementGql,
  DeleteElementInput,
  DeleteElementMutation,
  ElementFragment,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../element.module'
import { createElementInput } from '../../create-element/test/create-element.data'

describe('DeleteElement', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let element: ElementFragment
  let deleteElementInput: DeleteElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const results = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createElementInput)

    element = results.createElement
    deleteElementInput = {
      elementId: element.id,
    }

    expect(element.id).toBeDefined()
    expect(element).toMatchObject(createElementInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete an element', async () => {
      await domainRequest(guestApp, DeleteElementGql, deleteElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an element', async () => {
      const results = await domainRequest<
        DeleteElementInput,
        DeleteElementMutation
      >(userApp, DeleteElementGql, deleteElementInput)

      expect(results.deleteElement).toMatchObject({
        affected: 1,
      })
    })
  })
})
