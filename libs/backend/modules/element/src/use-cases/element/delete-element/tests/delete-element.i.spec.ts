import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { CreateElementInput } from '../../create-element'
import {
  CreateElementGql,
  CreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementInput } from '../../get-element/get-element.input'
import {
  GetElementGql,
  GetElementQuery,
} from '../../get-element/tests/get-element.api.graphql'
import { DeleteElementInput } from '../delete-element.input'
import {
  DeleteElementGql,
  DeleteElementMutation,
} from './delete-element.api.graphql'

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
