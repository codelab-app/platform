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
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql.gen'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementInput } from '../../get-element'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../get-element/tests/get-element.api.graphql.gen'
import { UpdateElementPropsInput } from '../update-element-props.input'
import { TestUpdateElementPropsGql } from './update-element-props.api.graphql.gen'

describe('UpdateElementProps', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let elementId: string
  let updatePropsInput: UpdateElementPropsInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })

    const results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createElementInput)

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
      await domainRequest(
        guestApp,
        TestUpdateElementPropsGql,
        updatePropsInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update an element', async () => {
      await domainRequest<UpdateElementPropsInput>(
        userApp,
        TestUpdateElementPropsGql,
        updatePropsInput,
      )

      const { getElement: element } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, { elementId })

      expect(element).toBeDefined()
      expect(element?.props).toBe(updatePropsInput.props)
    })
  })
})
