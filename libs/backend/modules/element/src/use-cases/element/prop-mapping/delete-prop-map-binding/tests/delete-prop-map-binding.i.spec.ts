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
import { DeletePropMapBindingInput } from '../delete-prop-map-binding.input'
import {
  TestDeletePropMapBindingGql,
  TestDeletePropMapBindingMutation,
} from './delete-prop-map-binding.api.graphql.gen'

describe('DeletePropMapBindingUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let deletePropMapBindingInput: DeletePropMapBindingInput
  let elementId: string
  let propMapBindingId1: string
  let propMapBindingId2: string

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

    propMapBindingId1 = createPropMapBinding.id

    const { createPropMapBinding: createPropMapBinding2 } = await domainRequest<
      CreatePropMapBindingInput,
      TestCreatePropMapBindingMutation
    >(userApp, TestCreatePropMapBindingGql, {
      elementId,
      targetElementId: createElement2.id,
      targetKey: 'hi',
      sourceKey: 'hello',
    })

    propMapBindingId2 = createPropMapBinding2.id

    deletePropMapBindingInput = {
      elementId,
      propMapBindingIds: [createPropMapBinding.id, createPropMapBinding2.id],
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete PropMapBinding', async () => {
      await domainRequest(
        guestApp,
        TestDeletePropMapBindingGql,
        deletePropMapBindingInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update a PropMapBinding', async () => {
      await domainRequest<
        DeletePropMapBindingInput,
        TestDeletePropMapBindingMutation
      >(userApp, TestDeletePropMapBindingGql, deletePropMapBindingInput)

      const { getElement } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, {
        where: {
          id: elementId,
        },
      })

      const found = getElement?.propMapBindings.find(
        (b) => b.id === propMapBindingId1 || b.id === propMapBindingId2,
      )

      expect(found).not.toBeDefined()
    })
  })
})
