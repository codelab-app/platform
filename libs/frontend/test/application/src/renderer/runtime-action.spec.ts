import { RendererType } from '@codelab/frontend/abstract/application'
import { IPageKind } from '@codelab/shared/abstract/core'
import { configure } from 'mobx'
import { unregisterRootStore } from 'mobx-keystone'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testBed: TestBed

describe('Runtime Element props', () => {
  beforeEach(() => {
    testBed = TestBed.Create()
  })

  it.each([[IPageKind.Provider], [IPageKind.Regular]])(
    'should evaluate api action config expression in %s page',
    async (pageKind) => {
      const isProviderPage = pageKind === IPageKind.Provider

      const { page, runtimePage } = testBed.setupPage(
        RendererType.Preview,
        pageKind,
      )

      const runtimeRootElement = runtimePage?.runtimeRootElement
      const runtimeProps = runtimeRootElement?.runtimeProps
      const element = runtimeRootElement?.element.current
      const actionName = 'fetchSomething'
      const stateKey = 'stateKey'
      const stateValue = 'default value'
      const apiActionId = 'apiActionId'

      configure({ safeDescriptors: false })

      const resource = testBed.addResource({})
      const store = isProviderPage ? element?.store : page.providerPage?.store
      const storeApi = store?.current.api.current

      const field = testBed.addField({
        api: storeApi,
        defaultValues: JSON.stringify(stateValue),
        fieldType: testBed.getStringType(),
        key: stateKey,
      })

      storeApi?.writeCache({ fields: [field] })

      testBed.addApiAction({
        config: {
          data: JSON.stringify({
            queryParams: { name: `{{state.${stateKey}}}` },
          }),
          id: apiActionId,
        },
        id: apiActionId,
        name: actionName,
        resource: { id: resource.id },
        store,
      })

      const fetchSpy = jest.fn().mockResolvedValue({})

      jest.spyOn(resource, 'client', 'get').mockReturnValue({
        fetch: fetchSpy,
      })

      const actionRunner = runtimeProps?.getActionRunner(actionName)

      await actionRunner?.()

      expect(fetchSpy).toHaveBeenCalledWith({
        queryParams: { name: stateValue },
      })

      configure({ safeDescriptors: true })
    },
  )

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
