import { RendererType } from '@codelab/frontend/abstract/application'
import { createTestStore } from '@codelab/frontend/application/test'
import { IPageKind } from '@codelab/shared/abstract/core'
import { configure } from 'mobx'

describe('Runtime Element props', () => {
  let testApplication: ReturnType<typeof createTestStore>

  beforeEach(() => {
    testApplication = createTestStore()
  })

  it.each([[IPageKind.Provider], [IPageKind.Regular]])(
    'should evaluate api action config expression in %s page',
    async (pageKind) => {
      const isProviderPage = pageKind === IPageKind.Provider

      const { page, runtimePage } = testApplication.setupPage(
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

      const resource = testApplication.addResource({})
      const store = isProviderPage ? element?.store : page.providerPage?.store
      const storeApi = store?.current.api.current

      const field = testApplication.addField({
        api: storeApi,
        defaultValues: JSON.stringify(stateValue),
        fieldType: testApplication.getStringType(),
        key: stateKey,
      })

      storeApi?.writeCache({ fields: [field] })

      testApplication.addApiAction({
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
    testApplication.teardown()
  })
})
