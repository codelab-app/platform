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
  GetElementGql,
  GetElementInput,
  GetElementQuery,
  UpdateElementPropsGql,
  UpdateElementPropsInput,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../element.module'
import { createElementInput } from '../../create-element/test/create-element.data'

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
