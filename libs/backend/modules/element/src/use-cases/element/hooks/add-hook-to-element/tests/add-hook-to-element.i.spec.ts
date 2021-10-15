import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import {
  HookType,
  PersistenceType,
  QueryMethod,
  Role,
} from '@codelab/shared/abstract/core'
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
  elementId: string,
  config: Record<string, any> | undefined,
) => {
  expect(hookId).toBeDefined()

  const { getElement } = await domainRequest<
    GetElementInput,
    TestGetElementQuery
  >(app, TestGetElementGql, { elementId })

  expect(getElement?.hooks?.find((h) => h.id === hookId)).toMatchObject({
    id: hookId,
    type,
    config,
  })
}

describe('AddHookToElementUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let addQueryHookInput: AddHookToElementInput
  let addGraphqlQueryHookInput: AddHookToElementInput
  let addRecoilStateHookInput: AddHookToElementInput
  let addGraphqlMutationHookInput: AddHookToElementInput

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

    addRecoilStateHookInput = {
      elementId: createElement.id,
      recoilStateHook: {
        stateKey: 'myState',
        defaultValue: 'true',
        persisted: PersistenceType.NotPersisted,
      },
    }

    addGraphqlMutationHookInput = {
      elementId: createElement.id,
      graphqlMutationHook: {
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

      await verifyHookIsAdded(
        userApp,
        id,
        HookType.Query,
        addQueryHookInput.elementId,
        addQueryHookInput.queryHook,
      )
    })

    it('should add a graphql query Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(userApp, addGraphqlQueryHookInput)

      await verifyHookIsAdded(
        userApp,
        id,
        HookType.GraphqlQuery,
        addGraphqlQueryHookInput.elementId,
        {
          graphqlBody: addGraphqlQueryHookInput.graphqlQueryHook?.body,
          graphqlUrl: addGraphqlQueryHookInput.graphqlQueryHook?.url,
          dataKey: addGraphqlQueryHookInput.graphqlQueryHook?.dataKey ?? null,
        },
      )
    })

    it('should add a graphql mutation Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(userApp, addGraphqlMutationHookInput)

      await verifyHookIsAdded(
        userApp,
        id,
        HookType.GraphqlMutation,
        addGraphqlMutationHookInput.elementId,
        {
          graphqlBody: addGraphqlMutationHookInput.graphqlMutationHook?.body,
          graphqlUrl: addGraphqlMutationHookInput.graphqlMutationHook?.url,
          dataKey:
            addGraphqlMutationHookInput.graphqlMutationHook?.dataKey ?? null,
        },
      )
    })

    it('should add a recoil state Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(userApp, addRecoilStateHookInput)

      await verifyHookIsAdded(
        userApp,
        id,
        HookType.RecoilState,
        addRecoilStateHookInput.elementId,
        addRecoilStateHookInput.recoilStateHook,
      )
    })
  })
})
