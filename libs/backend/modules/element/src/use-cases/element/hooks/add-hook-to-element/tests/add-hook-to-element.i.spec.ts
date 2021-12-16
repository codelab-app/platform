import { domainRequest } from '@codelab/backend/shared/testing'
import {
  AtomType,
  PersistenceType,
  QueryMethod,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
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
  type: AtomType,
  elementId: string,
  config: Maybe<string>,
) => {
  const { getElement } = await domainRequest<
    GetElementInput,
    TestGetElementQuery
  >(app, TestGetElementGql, { where: { id: elementId } })

  const foundHook = getElement?.hooks?.find(
    (h) => h.type === type && h.config.data === config,
  )

  expect(foundHook).toBeTruthy()
}

describe('AddHookToElementUseCase', () => {
  const elementTestModule = setupElementTestModule()
  let createElement
  let addQueryConfigHookInput: AddHookToElementInput
  let addGraphqlQueryHookInput: AddHookToElementInput
  let addRecoilStateHookInput: AddHookToElementInput
  let addGraphqlMutationHookInput: AddHookToElementInput

  beforeAll(async () => {
    createElement = await elementTestModule.createTestElement({
      name: 'Element',
    })

    addQueryConfigHookInput = {
      elementId: createElement.id,
      type: AtomType.HookQueryConfig,
      config: JSON.stringify({
        url: 'https://github.com',
        queryKey: 'My Query',
        method: QueryMethod.Get,
      }),
    }

    addGraphqlQueryHookInput = {
      elementId: createElement.id,
      type: AtomType.HookGraphqlQuery,
      config: JSON.stringify({
        graphqlUrl: 'https://github.com',
        graphqlBody:
          "Hello World. We don't actually validate if this is a valid gql string",
      }),
    }

    addRecoilStateHookInput = {
      elementId: createElement.id,
      type: AtomType.HookRecoilState,
      config: JSON.stringify({
        stateKey: 'myState',
        defaultValue: 'true',
        persisted: PersistenceType.NotPersisted,
      }),
    }

    addGraphqlMutationHookInput = {
      elementId: createElement.id,
      type: AtomType.HookGraphqlMutation,
      config: JSON.stringify({
        graphqlUrl: 'https://github.com',
        graphqlBody:
          "Hello World. We don't actually validate if this is a valid gql string",
      }),
    }
  })

  describe('Guest', () => {
    it('should fail to add a Hook to an Element', async () => {
      await domainRequest(
        elementTestModule.guestApp,
        TestAddHookToElementGql,
        addQueryConfigHookInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should add a query config Hook to an Element', async () => {
      await addHook(elementTestModule.userApp, addQueryConfigHookInput)

      await verifyHookIsAdded(
        elementTestModule.userApp,
        AtomType.HookQueryConfig,
        addQueryConfigHookInput.elementId,
        addQueryConfigHookInput.config,
      )
    })

    it('should add a graphql query Hook to an Element', async () => {
      await addHook(elementTestModule.userApp, addGraphqlQueryHookInput)

      await verifyHookIsAdded(
        elementTestModule.userApp,
        AtomType.HookGraphqlQuery,
        addGraphqlQueryHookInput.elementId,
        addGraphqlQueryHookInput.config,
      )
    })

    it('should add a graphql mutation Hook to an Element', async () => {
      await addHook(elementTestModule.userApp, addGraphqlMutationHookInput)

      await verifyHookIsAdded(
        elementTestModule.userApp,
        AtomType.HookGraphqlMutation,
        addGraphqlMutationHookInput.elementId,
        addGraphqlMutationHookInput.config,
      )
    })

    it('should add a recoil state Hook to an Element', async () => {
      await addHook(elementTestModule.userApp, addRecoilStateHookInput)

      await verifyHookIsAdded(
        elementTestModule.userApp,
        AtomType.HookRecoilState,
        addRecoilStateHookInput.elementId,
        addRecoilStateHookInput.config,
      )
    })
  })
})
