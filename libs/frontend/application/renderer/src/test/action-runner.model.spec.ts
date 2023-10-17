import { actionRef, IActionRunner } from '@codelab/frontend/abstract/domain'
import { ActionRunner } from '../action-runner.model'
import { factoryBuild } from './factory'
import { rootStore, setupPage } from './setup'

describe('ConditionalRenderPipe', () => {
  beforeEach(() => {
    rootStore.clear()
  })

  it('should run a code action', async () => {
    const testStoreId = 'test-store-id'

    const codeAction = factoryBuild('codeAction', {
      store: { id: testStoreId },
    })

    const { page, rootElement: pageRootElement } = setupPage({
      actions: [codeAction],
      storeId: testStoreId,
    })
    // const { page, rootElement: pageRootElement } = setupPage()

    const element = factoryBuild('element', {
      page,
      parentElement: pageRootElement,
      props: factoryBuild('props'),
      renderType: factoryBuild('atom', {
        api: factoryBuild('typeInterface'),
      }),
    })

    const elementModel = rootStore.elementService.element(element.id)
    // const codeAction = factoryBuild('codeAction', {
    //   store: { id: page.store.id },
    // })
    // console.log('codeAction.id', codeAction.id)
    // const pageStore = rootStore.storeService.stores.get(page.store.id)
    // pageStore?.actions.push(actionRef(codeAction.id))
    // pageStore?.writeCache({
    //   actions: [actionRef(rootStore.actionService.actions.get(codeAction.id)!)],
    // })
    const actionRunners = ActionRunner.create(elementModel)

    expect(actionRunners).toHaveLength(1)

    const model = rootStore.actionService.actions.get(codeAction.id)
    console.log('model', model)

    const modelRef = actionRef(model!)
    console.log('modelRef', modelRef.isValid)

    // console.log('actionRunners[0]?.id', actionRunners[0]?.id)

    // actionRunners[0]?.codeRunner()
    // console.log(
    //   'actionRunners[0]?.actionRef',
    //   actionRunners[0]?.actionRef.isValid,
    // )
  })

  it('should run an api action', async () => {})
})
