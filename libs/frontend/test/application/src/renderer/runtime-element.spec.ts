import { RendererType } from '@codelab/frontend/abstract/application'
import { RuntimeElementModel } from '@codelab/frontend-application-renderer/store'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { createTestStore } from '@codelab/frontend-application-test'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Runtime Element', () => {
  let testStore: ReturnType<typeof createTestStore>

  beforeEach(() => {
    testStore = createTestStore()
  })

  afterAll(() => {
    testStore.teardown()
  })

  it('should create element runtime node', () => {
    const { page, rootElement, runtimePage, runtimeRootElement } =
      testStore.setupRuntimeElement()

    // Test the creation of element node
    expect(runtimeRootElement.element.id).toBe(rootElement.id)

    // Test the creation of link with container node
    expect(runtimeRootElement.closestContainerNode.current.compositeKey).toBe(
      runtimePage?.compositeKey,
    )
  })

  it('should create children with text injection', async () => {
    const { renderer, rootElement } = testStore.setupRuntimeElement()
    const richTextType = testStore.addRichTextType({})

    rootElement.writeCache({
      renderType: testStore.getAtomByType(IAtomType.HtmlDiv),
    })

    rootElement.props.set('children', {
      kind: richTextType.kind,
      type: richTextType.id,
      value: 'text',
    })

    // render itself adds `body > div`
    render(
      React.createElement(
        StoreProvider,
        { value: testStore.coreStore },
        renderer.render,
      ),
    )

    expect(await screen.findByText('text')).toBeInTheDocument()
  })

  it('should add element runtime child', () => {
    const { rootElement, runtimePage, runtimeRootElement } =
      testStore.setupRuntimeElement()

    const childElement = testStore.addElement({
      name: 'child-element',
      parentElement: rootElement,
    })

    rootElement.writeCache({ firstChild: childElement })

    const runtimeChildElement = runtimeRootElement.children[0]

    const childCompositeKey = RuntimeElementModel.compositeKey(
      childElement,
      runtimePage,
    )

    expect(runtimeChildElement?.compositeKey).toBe(childCompositeKey)
  })

  it('should detach runtime element when element is detached', async () => {
    const { elementService, runtimeElementService } = testStore.coreStore
    const { page } = testStore.setupPage(undefined, IPageKind.Provider)

    expect(runtimeElementService.elementsList.length).toEqual(1)

    elementService.elementDomainService.elements.delete(page.rootElement.id)

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

      expect(runtimeRootElement?.closestContainerNode.id).toBe(
        runtimePage?.compositeKey,
      )

      expect(
        runtimeProviderRootElement?.closestContainerNode.current.compositeKey,
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
    'should run custom hooks that mutates state when in %s page - preRenderAction: `%s`, postRenderAction: `%s`, expectedValue: `%s`',
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
          preRenderAction: testStore.addCodeAction({
            code: preRenderActionCode,
            name: 'preRenderAction',
            store: providerPage.store,
          }),
        })
      }

      if (postRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          postRenderAction: testStore.addCodeAction({
            code: postRenderActionCode,
            name: 'postRenderAction',
            store: providerPage.store,
          }),
        })
      }

      expect(runtimeStore?.state[stateFieldKey]).toBe('default value')

      const reactElement = testStore.addRenderer({
        containerNode: page,
        id: renderer.id,
        rendererType: RendererType.Preview,
      }).render

      render(
        React.createElement(
          StoreProvider,
          { value: testStore.coreStore },
          reactElement,
        ),
      )

      expect(runtimeStore?.state[stateFieldKey]).toBe(expectedValue)
    },
  )
})
