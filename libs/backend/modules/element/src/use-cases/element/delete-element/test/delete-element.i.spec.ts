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
  DeleteElementGql,
  DeleteElementInput,
  DeleteElementMutation,
  GetElementGql,
  GetElementInput,
  GetElementQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { createElementInput } from '../../create-element/test/create-element.data'

describe('DeleteElement', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let deleteElementInput: DeleteElementInput
  let getElementInput: GetElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const results = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createElementInput)

    elementId = results.createElement.id
    deleteElementInput = { elementId }
    getElementInput = { elementId }

    expect(elementId).toBeDefined()
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
      await domainRequest<DeleteElementInput, DeleteElementMutation>(
        userApp,
        DeleteElementGql,
        deleteElementInput,
      )

      // Should fail to get the deleted element
      const { getElement } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, getElementInput)

      expect(getElement).toBeNull()
    })
  })
})
