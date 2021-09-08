import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { CreateElementInput } from '../../create-element'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql.gen'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementInput } from '../../get-element'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../get-element/tests/get-element.api.graphql.gen'
import { DeleteElementInput } from '../delete-element.input'
import {
  TestDeleteElementGql,
  TestDeleteElementMutation,
} from './delete-element.api.graphql.gen'

describe('DeleteElement', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let deleteElementInput: DeleteElementInput
  let getElementInput: GetElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })

    const results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createElementInput)

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
      await domainRequest(guestApp, TestDeleteElementGql, deleteElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an element', async () => {
      await domainRequest<DeleteElementInput, TestDeleteElementMutation>(
        userApp,
        TestDeleteElementGql,
        deleteElementInput,
      )

      // Should fail to get the deleted element
      const { getElement } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, getElementInput)

      expect(getElement).toBeNull()
    })
  })
})
