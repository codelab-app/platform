import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
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
import { CreatePropMapBindingInput } from '../../create-prop-map-binding'
import {
  TestCreatePropMapBindingGql,
  TestCreatePropMapBindingMutation,
} from '../../create-prop-map-binding/tests/create-prop-map-binding.api.graphql.gen'
import { UpdatePropMapBindingInput } from '../update-prop-map-binding.input'
import {
  TestUpdatePropMapBindingGql,
  TestUpdatePropMapBindingMutation,
} from './update-prop-map-binding.api.graphql.gen'

describe('UpdatePropMapBindingUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let updatePropMappingInput: UpdatePropMapBindingInput
  let elementId: string

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

    elementId = createElement.id

    const { createPropMapBinding } = await domainRequest<
      CreatePropMapBindingInput,
      TestCreatePropMapBindingMutation
    >(userApp, TestCreatePropMapBindingGql, {
      elementId,
      targetElementId: createElement2.id,
      targetKey: 'hi',
      sourceKey: 'hello',
    })

    updatePropMappingInput = {
      propMapBindingId: createPropMapBinding.id,
      data: {
        sourceKey: 'data',
        targetKey: 'newData',
        targetElementId: createElement2.id,
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update a PropMapBinding', async () => {
      await domainRequest(
        guestApp,
        TestUpdatePropMapBindingGql,
        updatePropMappingInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update a PropMapBinding', async () => {
      await domainRequest<
        UpdatePropMapBindingInput,
        TestUpdatePropMapBindingMutation
      >(userApp, TestUpdatePropMapBindingGql, updatePropMappingInput)

      const { getElement } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, {
        elementId,
      })

      const found = getElement?.propMapBindings.find(
        (b) => b.id === updatePropMappingInput.propMapBindingId,
      )

      expect(found).toBeDefined()
      expect(found).toMatchObject({
        id: updatePropMappingInput.propMapBindingId,
        targetKey: updatePropMappingInput.data.targetKey,
        sourceKey: updatePropMappingInput.data.sourceKey,
        targetElementId: updatePropMappingInput.data.targetElementId,
      })
    })
  })
})
