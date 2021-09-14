import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../../element.module'
import { CreateElementInput } from '../../../create-element'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../../create-element/tests/create-element.api.graphql.gen'
import { GetElementInput } from '../../../get-element'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../../get-element/tests/get-element.api.graphql.gen'
import { CreatePropMapBindingInput } from '../create-prop-map-binding.input'
import {
  TestCreatePropMapBindingGql,
  TestCreatePropMapBindingMutation,
} from './create-prop-map-binding.api.graphql.gen'

describe('CreatePropMapBindingUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let addPropMappinginput: CreatePropMapBindingInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })

    const { createElement } = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, { name: 'Element' })

    const { createElement: createElement2 } = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, { name: 'Element' })

    addPropMappinginput = {
      elementId: createElement.id,
      targetElementId: createElement2.id,
      sourceKey: 'data',
      targetKey: 'anotherData',
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a PropMapBinding', async () => {
      await domainRequest(
        guestApp,
        TestCreatePropMapBindingGql,
        addPropMappinginput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a PropMapBinding', async () => {
      const {
        createPropMapBinding: { id },
      } = await domainRequest<
        CreatePropMapBindingInput,
        TestCreatePropMapBindingMutation
      >(userApp, TestCreatePropMapBindingGql, addPropMappinginput)

      expect(id).toBeDefined()

      const { getElement } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, {
        elementId: addPropMappinginput.elementId,
      })

      const found = getElement?.propMapBindings.find((b) => b.id === id)

      expect(found).toBeDefined()
      expect(found).toMatchObject({
        id,
        targetKey: addPropMappinginput.targetKey,
        sourceKey: addPropMappinginput.sourceKey,
        targetElementId: addPropMappinginput.targetElementId,
      })
    })
  })
})
