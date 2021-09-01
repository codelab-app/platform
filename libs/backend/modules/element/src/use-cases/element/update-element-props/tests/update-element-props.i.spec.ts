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
import { GetElementInput } from '../../get-element'
import {
  GetElementGql,
  GetElementQuery,
} from '../../get-element/tests/get-element.api.graphql'
import { UpdateElementPropsInput } from '../update-element-props.input'
import { UpdateElementPropsGql } from './update-element-props.api.graphql'

describe('UpdateElementProps', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let updatePropsInput: UpdateElementPropsInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const results = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createElementInput)

    elementId = results.createElement.id

    expect(elementId).toBeDefined()

    updatePropsInput = {
      elementId,
      props: JSON.stringify({ someProp: true, otherProp: { hello: 'world' } }),
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update an element', async () => {
      await domainRequest(guestApp, UpdateElementPropsGql, updatePropsInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an element', async () => {
      await domainRequest<UpdateElementPropsInput>(
        userApp,
        UpdateElementPropsGql,
        updatePropsInput,
      )

      const { getElement: element } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, { elementId })

      expect(element).toBeDefined()
      expect(element?.props).toBe(updatePropsInput.props)
    })
  })
})
