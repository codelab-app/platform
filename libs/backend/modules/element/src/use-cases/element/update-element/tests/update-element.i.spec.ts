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
import { UpdateElementInput } from '../update-element.input'
import {
  TestUpdateElementGql,
  TestUpdateElementMutation,
} from './update-element.api.graphql.gen'

describe('UpdateElement', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let updateElementInput: UpdateElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })

    const results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createElementInput)

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
      await domainRequest(guestApp, TestUpdateElementGql, updateElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an element', async () => {
      await domainRequest<UpdateElementInput, TestUpdateElementMutation>(
        userApp,
        TestUpdateElementGql,
        updateElementInput,
      )

      const { getElement: element } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, { elementId })

      expect(element).toMatchObject({
        ...updateElementInput.data,
        id: updateElementInput.id,
      })
    })
  })
})
