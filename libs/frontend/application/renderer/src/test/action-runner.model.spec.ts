/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { elementTreeRef, rendererRef } from '@codelab/frontend/abstract/domain'
import { ResourceType } from '@codelab/shared/abstract/codegen'
import nock from 'nock'
import { ActionRunner } from '../action-runner.model'
import { factoryBuild } from './factory'
import { rootStore, setupPage } from './setup'

describe('ActionRunnerModel', () => {
  beforeEach(() => {
    rootStore.clear()
    nock.cleanAll()
  })

  it('should run a code action', async () => {
    const testArg = 'hi there'
    const spyFn = jest.fn()
    const testStoreId = 'test-store-id'

    const codeAction = factoryBuild('codeAction', {
      code: `function run(fun) {
        fun('${testArg}')
      }`,
      store: { id: testStoreId },
    })

    const { page, rootElement: pageRootElement } = setupPage({
      actions: [codeAction],
      storeId: testStoreId,
    })

    const elementModel = rootStore.elementService.element(pageRootElement.id)
    const actionRunners = ActionRunner.create(elementModel)

    expect(actionRunners).toHaveLength(1)

    const renderer = factoryBuild('renderer', {
      elementTree: elementTreeRef(rootStore.pageService.page(page.id)!),
    })

    rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))

    rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
      elementModel,
    )

    const actionRunner = renderer.actionRunners.get(actionRunners[0]!.id)

    actionRunner!.runner(spyFn)

    expect(spyFn).toHaveBeenCalledWith(testArg)
  })

  it('should run a REST api action', async () => {
    const scope = nock('http://localhost:8080').get('/something').reply(200)
    const testStoreId = 'test-store-id'

    const resourceConfig = factoryBuild('props', {
      data: JSON.stringify({
        url: 'http://localhost:8080/something',
      }),
    })

    const resource = factoryBuild('resource', {
      config: resourceConfig,
      name: 'Test API',
      type: ResourceType.Rest,
    })

    const apiAction = factoryBuild('apiAction', {
      config: factoryBuild('props'),
      resource,
      store: { id: testStoreId },
    })

    const { page, rootElement: pageRootElement } = setupPage({
      actions: [apiAction],
      storeId: testStoreId,
    })

    const elementModel = rootStore.elementService.element(pageRootElement.id)
    const actionRunners = ActionRunner.create(elementModel)

    expect(actionRunners).toHaveLength(1)

    const renderer = factoryBuild('renderer', {
      elementTree: elementTreeRef(rootStore.pageService.page(page.id)!),
    })

    rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))

    rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
      elementModel,
    )

    const actionRunner = renderer.actionRunners.get(actionRunners[0]!.id)

    await actionRunner!.runner()

    expect(scope.isDone()).toBe(true)
  })

  it.each([['success'], ['error']])(
    'should run a REST api action with %s code action',
    async (responseStatus) => {
      const scope = nock('http://localhost:8080')
        .get('/something')
        .reply(responseStatus === 'success' ? 200 : 500)

      const testStoreId = 'test-store-id'
      const successLogText = 'running the success action in the test'
      const errorLogText = 'running the error action in the test'

      const successAction = factoryBuild('codeAction', {
        code: `function run() {
        console.log('${successLogText}')
      }`,
        store: { id: testStoreId },
      })

      const errorAction = factoryBuild('codeAction', {
        code: `function run() {
        console.log('${errorLogText}')
      }`,
        store: { id: testStoreId },
      })

      const resourceConfig = factoryBuild('props', {
        data: JSON.stringify({
          url: 'http://localhost:8080/something',
        }),
      })

      const resource = factoryBuild('resource', {
        config: resourceConfig,
        name: 'Test API',
        type: ResourceType.Rest,
      })

      const apiAction = factoryBuild('apiAction', {
        config: factoryBuild('props'),
        errorAction,
        resource,
        store: { id: testStoreId },
        successAction,
      })

      const { page, rootElement: pageRootElement } = setupPage({
        actions: [apiAction, successAction, errorAction],
        storeId: testStoreId,
      })

      const elementModel = rootStore.elementService.element(pageRootElement.id)
      const actionRunners = ActionRunner.create(elementModel)

      expect(actionRunners).toHaveLength(3)

      const renderer = factoryBuild('renderer', {
        elementTree: elementTreeRef(rootStore.pageService.page(page.id)!),
      })

      rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))

      rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
        elementModel,
      )

      const apiActionRunner = renderer.actionRunners.get(actionRunners[0]!.id)
      const consoleLogSpy = jest.spyOn(global.console, 'log')

      await apiActionRunner!.runner()

      expect(scope.isDone()).toBe(true)
      expect(consoleLogSpy).toHaveBeenCalledWith(
        responseStatus === 'success' ? successLogText : errorLogText,
      )
    },
  )

  it('should run a graphql api action', async () => {
    const query = `query { products { id name } }`

    const variables = {
      a: 1,
      b: 'something',
    }

    const scope = nock('http://localhost:8080')
      .post('/graphql', { query, variables })
      .reply(200)

    const testStoreId = 'test-store-id'

    const resourceConfig = factoryBuild('props', {
      data: JSON.stringify({
        url: 'http://localhost:8080/graphql',
      }),
    })

    const resource = factoryBuild('resource', {
      config: resourceConfig,
      name: 'Test Graphql API',
      type: ResourceType.GraphQl,
    })

    const apiAction = factoryBuild('apiAction', {
      config: factoryBuild('props', {
        data: JSON.stringify({
          query,
          variables: JSON.stringify(variables),
        }),
      }),
      resource,
      store: { id: testStoreId },
    })

    const { page, rootElement: pageRootElement } = setupPage({
      actions: [apiAction],
      storeId: testStoreId,
    })

    const elementModel = rootStore.elementService.element(pageRootElement.id)
    const actionRunners = ActionRunner.create(elementModel)

    expect(actionRunners).toHaveLength(1)

    const renderer = factoryBuild('renderer', {
      elementTree: elementTreeRef(rootStore.pageService.page(page.id)!),
    })

    rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))

    rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
      elementModel,
    )

    const actionRunner = renderer.actionRunners.get(actionRunners[0]!.id)

    await actionRunner!.runner()

    expect(scope.isDone()).toBe(true)
  })

  it.each([['success'], ['error']])(
    'should run a graphql api action with %s code action',
    async (responseStatus) => {
      const query = `query { products { id name } }`

      const variables = {
        a: 1,
        b: 'something',
      }

      const scope = nock('http://localhost:8080')
        .post('/graphql', { query, variables })
        .reply(
          200,
          responseStatus === 'success'
            ? {
                data: {
                  products: [
                    {
                      id: 'product-id',
                      name: 'Product Name',
                    },
                  ],
                },
              }
            : {
                errors: [
                  {
                    message: 'Some error',
                  },
                ],
              },
        )

      const testStoreId = 'test-store-id'

      const successAction = factoryBuild('codeAction', {
        code: `function run(data) {
        console.log(data.products[0].name)
      }`,
        store: { id: testStoreId },
      })

      const errorAction = factoryBuild('codeAction', {
        code: `function run(data) {
        console.log(data.response.errors[0].message)
      }`,
        store: { id: testStoreId },
      })

      const resourceConfig = factoryBuild('props', {
        data: JSON.stringify({
          url: 'http://localhost:8080/graphql',
        }),
      })

      const resource = factoryBuild('resource', {
        config: resourceConfig,
        name: 'Test Graphql API',
        type: ResourceType.GraphQl,
      })

      const apiAction = factoryBuild('apiAction', {
        config: factoryBuild('props', {
          data: JSON.stringify({
            query,
            variables: JSON.stringify(variables),
          }),
        }),
        errorAction,
        resource,
        store: { id: testStoreId },
        successAction,
      })

      const { page, rootElement: pageRootElement } = setupPage({
        actions: [apiAction, successAction, errorAction],
        storeId: testStoreId,
      })

      const elementModel = rootStore.elementService.element(pageRootElement.id)
      const actionRunners = ActionRunner.create(elementModel)

      expect(actionRunners).toHaveLength(3)

      const renderer = factoryBuild('renderer', {
        elementTree: elementTreeRef(rootStore.pageService.page(page.id)!),
      })

      rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))

      rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
        elementModel,
      )

      const apiActionRunner = renderer.actionRunners.get(actionRunners[0]!.id)
      const consoleLogSpy = jest.spyOn(global.console, 'log')

      await apiActionRunner!.runner()

      expect(scope.isDone()).toBe(true)
      expect(consoleLogSpy).toHaveBeenCalledWith(
        responseStatus === 'success' ? 'Product Name' : 'Some error',
      )
    },
  )
})
