import { RendererType } from '@codelab/frontend/abstract/application'
import { RuntimeElementModel } from '@codelab/frontend/application/renderer'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { createTestApplication } from '@codelab/frontend/application/test'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React from 'react'

describe('Runtime Element', () => {
  const testApplication = createTestApplication()

  beforeEach(() => {
    testApplication.init()
  })

  it.only('should create element runtime node', () => {
    const { page, rootElement, runtimePage, runtimeRootElement } =
      testApplication.setupRuntimeElement()

    // Test the creation of element node
    expect(runtimeRootElement.element.id).toBe(rootElement.id)

    // Test the creation of link with container node
    expect(runtimeRootElement.closestContainerNode.current.compositeKey).toBe(
      runtimePage?.compositeKey,
    )
  })

  it('should create children with text injection', () => {
    const { page, rendered, renderer, runtimePage } =
      testApplication.setupPage()

    const rootElement = page.rootElement.current
    const divRenderType = testApplication.getAtomByType(IAtomType.HtmlDiv)

    rootElement.writeCache({ renderType: divRenderType })
    rootElement.props.set('children', 'text')

    // console.log(runtimeRootElement.runtimeProps.evaluatedProps)

    // console.log(rendered?.props.children)
    // console.log(rendered?.props.children.props)

    const rootApplicationStore = testApplication.rootStore

    // render itself adds `body > div`
    const { debug } = render(
      React.createElement(
        StoreProvider,
        { value: rootApplicationStore },
        rootApplicationStore.rendererService.activeRenderer?.current.render,
      ),
    )

    debug()

    expect(true).toBeFalsy()
  })

  it('should add element runtime child', () => {
    const { rootElement, runtimePage, runtimeRootElement } =
      testApplication.setupRuntimeElement()

    const childElement = testApplication.addElement({
      name: 'child-element',
      parentElement: rootElement,
    })

    rootElement.writeCache({ firstChild: childElement })

    const runtimeChildElement = runtimeRootElement.children[0]

    const childCompositeKey = RuntimeElementModel.compositeKey(
      childElement,
      runtimePage!,
    )

    expect(runtimeChildElement?.compositeKey).toBe(childCompositeKey)
  })

  it('should detach runtime element when element is detached', async () => {
    const { elementService, runtimeElementService } = testApplication.rootStore
    const { page } = testApplication.setupPage(undefined, IPageKind.Provider)

    expect(runtimeElementService.elementsList.length).toEqual(1)

    elementService.elementDomainService.elements.delete(page.rootElement.id)

    expect(runtimeElementService.elementsList.length).toEqual(0)
  })

  it.each([[IPageKind.Provider], [IPageKind.Regular]])(
    'should resolve closest runtime container node when in %s',
    (pageKind) => {
      const { runtimePage, runtimeProviderPage } = testApplication.setupPage(
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
      const { page, renderer, runtimeProviderPage } = testApplication.setupPage(
        RendererType.Preview,
      )

      const providerPage = page.providerPage ?? page
      const runtimeStore = runtimeProviderPage?.runtimeStore
      const storeApi = providerPage.store.current.api.current
      const stateFieldKey = 'search'

      const field = testApplication.addField({
        api: storeApi,
        defaultValues: JSON.stringify('default value'),
        fieldType: testApplication.getStringType(),
        key: stateFieldKey,
      })

      storeApi.writeCache({ fields: [field] })

      if (preRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          preRenderAction: testApplication.addCodeAction({
            code: preRenderActionCode,
            name: 'preRenderAction',
            store: providerPage.store,
          }),
        })
      }

      if (postRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          postRenderAction: testApplication.addCodeAction({
            code: postRenderActionCode,
            name: 'postRenderAction',
            store: providerPage.store,
          }),
        })
      }

      expect(runtimeStore?.state[stateFieldKey]).toBe('default value')

      const reactElement = testApplication.addRenderer({
        containerNode: page,
        id: renderer.id,
        rendererType: RendererType.Preview,
      }).render

      render(
        React.createElement(
          StoreProvider,
          { value: testApplication.rootStore },
          reactElement,
        ),
      )

      expect(runtimeStore?.state[stateFieldKey]).toBe(expectedValue)
    },
  )

  afterAll(() => {
    unregisterRootStore(testApplication)
  })
})
