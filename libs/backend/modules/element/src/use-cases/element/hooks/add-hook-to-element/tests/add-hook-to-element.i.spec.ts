import { domainRequest } from '@codelab/backend/shared/testing'
import {
  HookType,
  PersistenceType,
  QueryMethod,
} from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { setupElementTestModule } from '../../../../../test/setupElementTestModule'
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
  >(app, TestGetElementGql, { where: { id: elementId } })

  expect(getElement?.hooks?.find((h) => h.id === hookId)).toMatchObject({
    id: hookId,
    type,
    config,
  })
}

describe('AddHookToElementUseCase', () => {
  const testModule = setupElementTestModule()
  let addQueryHookInput: AddHookToElementInput
  let addGraphqlQueryHookInput: AddHookToElementInput
  let addRecoilStateHookInput: AddHookToElementInput
  let addGraphqlMutationHookInput: AddHookToElementInput

  beforeAll(async () => {
    const createElement = await testModule.createTestElement({
      name: 'Element',
    })

    addQueryHookInput = {
      elementId: createElement.id,
      queryHook: {
        url: 'https://github.com',
        queryKey: 'My Query',
        method: QueryMethod.Get,
      },
    }

    addGraphqlQueryHookInput = {
      elementId: createElement.id,
      graphqlQueryHook: {
        graphqlUrl: 'https://github.com',
        graphqlBody:
          "Hello World. We don't actually validate if this is a valid gql string",
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
        graphqlUrl: 'https://github.com',
        graphqlBody:
          "Hello World. We don't actually validate if this is a valid gql string",
      },
    }
  })

  describe('Guest', () => {
    it('should fail to add a Hook to an Element', async () => {
      await domainRequest(
        testModule.guestApp,
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
      } = await addHook(testModule.userApp, addQueryHookInput)

      await verifyHookIsAdded(
        testModule.userApp,
        id,
        HookType.Query,
        addQueryHookInput.elementId,
        addQueryHookInput.queryHook,
      )
    })

    it('should add a graphql query Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(testModule.userApp, addGraphqlQueryHookInput)

      await verifyHookIsAdded(
        testModule.userApp,
        id,
        HookType.GraphqlQuery,
        addGraphqlQueryHookInput.elementId,
        {
          graphqlBody: addGraphqlQueryHookInput.graphqlQueryHook?.graphqlBody,
          graphqlUrl: addGraphqlQueryHookInput.graphqlQueryHook?.graphqlUrl,
          dataKey: addGraphqlQueryHookInput.graphqlQueryHook?.dataKey ?? null,
        },
      )
    })

    it('should add a graphql mutation Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(testModule.userApp, addGraphqlMutationHookInput)

      await verifyHookIsAdded(
        testModule.userApp,
        id,
        HookType.GraphqlMutation,
        addGraphqlMutationHookInput.elementId,
        {
          graphqlBody:
            addGraphqlMutationHookInput.graphqlMutationHook?.graphqlBody,
          graphqlUrl:
            addGraphqlMutationHookInput.graphqlMutationHook?.graphqlUrl,
          dataKey:
            addGraphqlMutationHookInput.graphqlMutationHook?.dataKey ?? null,
        },
      )
    })

    it('should add a recoil state Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await addHook(testModule.userApp, addRecoilStateHookInput)

      await verifyHookIsAdded(
        testModule.userApp,
        id,
        HookType.RecoilState,
        addRecoilStateHookInput.elementId,
        addRecoilStateHookInput.recoilStateHook,
      )
    })
  })
})
