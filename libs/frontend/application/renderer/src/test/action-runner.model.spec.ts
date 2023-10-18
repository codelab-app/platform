import { elementTreeRef, rendererRef } from '@codelab/frontend/abstract/domain'
import { ActionRunner } from '../action-runner.model'
import { factoryBuild } from './factory'
import { rootStore, setupPage } from './setup'

describe('ConditionalRenderPipe', () => {
  beforeEach(() => {
    rootStore.clear()
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

  it('should run an api action', async () => {
    // test
  })
})
