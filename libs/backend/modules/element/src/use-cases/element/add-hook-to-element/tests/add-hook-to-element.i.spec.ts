import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { HookType, QueryMethod, Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { CreateElementInput } from '../../create-element'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql.gen'
import { GetElementInput } from '../../get-element'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../get-element/tests/get-element.api.graphql.gen'
import { AddHookToElementInput } from '../add-hook-to-element.input'
import {
  TestAddHookToElementGql,
  TestAddHookToElementMutation,
} from './add-hook-to-element.api.graphql.gen'

const addHook = (app: INestApplication, input: AddHookToElementInput) =>
  domainRequest<AddHookToElementInput, TestAddHookToElementMutation>(
    app,
    TestAddHookToElementGql,
    input,
  )

const verifyHookIsAdded = async (
  app: INestApplication,
  hookId: string,
  type: HookType,
  input: AddHookToElementInput,
) => {
  expect(hookId).toBeDefined()

  const { getElement } = await domainRequest<
    GetElementInput,
    TestGetElementQuery
  >(app, TestGetElementGql, { elementId: input.elementId })

  expect(getElement?.hooks?.find((h) => h.id === hookId)).toMatchObject({
    id: hookId,
    type,
    config: {
      ...input.queryHook,
    },
  })
}

describe('AddHookToElementUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let addQueryHookInput: AddHookToElementInput
  let addGraphqlQueryHookInput: AddHookToElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([ElementModule], {
      role: Role.User,
    })

    const { createElement } = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, { name: 'Element' })

    addQueryHookInput = {
      elementId: createElement.id,
      queryHook: {
        url: 'https://github.com',
        queryKey: 'My Query',
        method: QueryMethod.GET,
      },
    }

    addGraphqlQueryHookInput = {
      elementId: createElement.id,
      graphqlQueryHook: {
        url: 'https://github.com',
        body: "Hello World. We don't actually validate if this is a valid gql string",
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to add a Hook to an Element', async () => {
      await domainRequest(
        guestApp,
        TestAddHookToElementGql,
        addQueryHookInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should add a query Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(userApp, addQueryHookInput)

      await verifyHookIsAdded(userApp, id, HookType.Query, addQueryHookInput)
    })

    it('should add a graphql query Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(userApp, addGraphqlQueryHookInput)

      await verifyHookIsAdded(
        userApp,
        id,
        HookType.GraphqlQuery,
        addGraphqlQueryHookInput,
      )
    })
  })
})
