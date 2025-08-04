import { RendererType } from '@codelab/frontend-abstract-application'
import { PropKind } from '@codelab/frontend-abstract-domain'
import { RuntimeElementModel } from '@codelab/frontend-application-renderer/store'
import {
  createTestStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx-store'
import { IAtomType, IPageKind } from '@codelab/shared-abstract-core'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'

describe('Runtime Element', () => {
  let storeContext: ReturnType<typeof createTestStore>
  let testStore: ReturnType<typeof createTestStore>['rootStore']

  beforeEach(() => {
    storeContext = createTestStore()
    testStore = storeContext.rootStore
  })

  afterAll(() => {
    testStore.teardown()
  })

  it('should create element runtime node', () => {
    const { page, rootElement, runtimePage, runtimeRootElement } =
      testStore.setupRuntimeElement()

    // Test the creation of element node
    expect(runtimeRootElement.current.element.id).toBe(rootElement.id)

    // Test the creation of link with container node
    expect(runtimeRootElement.current.closestContainerNode.compositeKey).toBe(
      runtimePage?.compositeKey,
    )
  })

  it('should create children with text injection', async () => {
    const { renderer, rootElement } = testStore.setupRuntimeElement(
      RendererType.Preview,
      IPageKind.Provider,
    )

    const richTextType = testStore.addRichTextType({})

    rootElement.writeCache({
      renderType: testStore.getAtomByType(IAtomType.HtmlDiv),
    })

    rootElement.props.set('children', {
      kind: richTextType.kind,
      type: richTextType.id,
      propKind: PropKind.TypedProp,
      value: 'text',
    })

    // render itself adds `body > div`
    render(
      createElement(
        RootStoreProvider,
        { value: storeContext },
        renderer.rendered,
      ),
    )

    expect(await screen.findByText('text')).toBeInTheDocument()
  })

  it('should add element runtime child', () => {
    const { renderer, rootElement, runtimePage, runtimeRootElement } =
      testStore.setupRuntimeElement()

    const childElement = testStore.addElement({
      name: 'child-element',
      parentElement: rootElement,
      renderType: testStore.getAtomByType(IAtomType.HtmlDiv),
    })

    rootElement.writeCache({ firstChild: childElement })

    renderer.render()

    const runtimeChildElement = runtimeRootElement.current.children[0]?.current

    const childCompositeKey = runtimePage
      ? RuntimeElementModel.compositeKey(
          childElement,
          runtimePage.runtimeRootElement.current.compositeKey,
        )
      : undefined

    expect(runtimeChildElement?.compositeKey).toBe(childCompositeKey)
  })

  it('should detach runtime element when element is detached', async () => {
    const { elementDomainService } = testStore.domainStore
    const { runtimeElementService } = testStore.applicationStore
    const { page } = testStore.setupPage(undefined, IPageKind.Provider)

    expect(runtimeElementService.elementsList.length).toEqual(1)

    elementDomainService.elements.delete(page.rootElement.id)

    expect(runtimeElementService.elementsList.length).toEqual(0)
  })

  it.each([[IPageKind.Provider], [IPageKind.Regular]])(
    'should resolve closest runtime container node when in %s',
    (pageKind) => {
      const { runtimePage, runtimeProviderPage } = testStore.setupPage(
        RendererType.Preview,
        pageKind,
      )

      const runtimeRootElement = runtimePage?.runtimeRootElement
      const runtimeProviderRootElement = runtimeProviderPage?.runtimeRootElement

      expect(
        runtimeRootElement?.current.closestContainerNode.compositeKey,
      ).toBe(runtimePage?.compositeKey)

      expect(
        runtimeProviderRootElement?.current.closestContainerNode.compositeKey,
      ).toBe(runtimeProviderPage?.compositeKey)
    },
  )

  it.each([
    [
      IPageKind.Provider,
      'function () { state.search = "pre render value" }',
      'function () { state.search = "post render value" }',
      'post render value',
    ],
    [
      IPageKind.Provider,
      null,
      'function () { state.search = "post render value" }',
      'post render value',
    ],
    [
      IPageKind.Provider,
      'function () { state.search = "pre render value" }',
      null,
      'pre render value',
    ],
    [
      IPageKind.Regular,
      'function () { state.search = "pre render value" }',
      null,
      'pre render value',
    ],
  ])(
    'should run custom hooks that mutates state when in %s page - preRenderActions: `%s`, postRenderActions: `%s`, expectedValue: `%s`',
    (pageKind, preRenderActionCode, postRenderActionCode, expectedValue) => {
      const { page, renderer, runtimeProviderPage } = testStore.setupPage(
        RendererType.Preview,
      )

      const providerPage = page.providerPage ?? page
      const runtimeStore = runtimeProviderPage?.runtimeStore
      const storeApi = providerPage.store.current.api.current
      const stateFieldKey = 'search'

      const field = testStore.addField({
        api: storeApi,
        defaultValues: JSON.stringify('default value'),
        fieldType: testStore.getStringType(),
        key: stateFieldKey,
      })

      storeApi.writeCache({ fields: [field] })

      if (preRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          preRenderActions: [
            testStore.addCodeAction({
              code: preRenderActionCode,
              name: 'preRenderActions',
              store: providerPage.store,
            }),
          ],
        })
      }

      if (postRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          postRenderActions: [
            testStore.addCodeAction({
              code: postRenderActionCode,
              name: 'postRenderActions',
              store: providerPage.store,
            }),
          ],
        })
      }

      expect(runtimeStore?.state[stateFieldKey]).toBe('default value')

      const renderer2 = testStore.addRenderer({
        containerNode: renderer.containerNode.current,
        id: renderer.id,
        rendererType: RendererType.Preview,
      })

      renderer2.render()

      const reactElement = renderer.rendered

      render(
        createElement(RootStoreProvider, { value: storeContext }, reactElement),
      )

      expect(runtimeStore?.state[stateFieldKey]).toBe(expectedValue)
    },
  )
})
