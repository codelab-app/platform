import { RendererType } from '@codelab/frontend/abstract/application'
import { RuntimeElementModel } from '@codelab/frontend/application/renderer'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { IPageKind } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React from 'react'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testBed: TestBed

describe('Runtime Element', () => {
  beforeEach(() => {
    testBed = TestBed.Create()
  })

  it('should create element runtime node', () => {
    const { page, rootElement, runtimePage, runtimeRootElement } =
      testBed.setupRuntimeElement()

    // Test the creation of element node
    expect(runtimeRootElement.element.id).toBe(rootElement.id)

    // Test the creation of link with container node
    expect(runtimeRootElement.closestContainerNode.current.compositeKey).toBe(
      runtimePage?.compositeKey,
    )
  })

  it.skip('should create children with text injection', () => {
    const { rendered, rootElement, runtimeRootElement } =
      testBed.setupRuntimeElement()

    const divRenderType = testBed.getDivAtom()

    rootElement.writeCache({ renderType: divRenderType })
    rootElement.props.set('children', 'text')

    // console.log(runtimeRootElement.runtimeProps.evaluatedProps)

    // console.log(rendered?.props.children)
    // console.log(rendered?.props.children.props)

    const { debug } = render(
      React.createElement(
        StoreProvider,
        { value: rootApplicationStore },
        rendered,
      ),
    )

    debug()

    expect(true).toBeFalsy()
  })

  it('should add element runtime child', () => {
    const { rootElement, runtimePage, runtimeRootElement } =
      testBed.setupRuntimeElement()

    const childElement = testBed.addElement({
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
    const { elementService, runtimeElementService } = rootApplicationStore
    const { page } = testBed.setupPage(undefined, IPageKind.Provider)

    expect(runtimeElementService.elementsList.length).toEqual(1)

    elementService.elementDomainService.elements.delete(page.rootElement.id)

    expect(runtimeElementService.elementsList.length).toEqual(0)
  })

  it.each([[IPageKind.Provider], [IPageKind.Regular]])(
    'should resolve closest runtime container node when in %s',
    (pageKind) => {
      const { runtimePage, runtimeProviderPage } = testBed.setupPage(
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
      const { page, renderer, runtimeProviderPage } = testBed.setupPage(
        RendererType.Preview,
      )

      const providerPage = page.providerPage ?? page
      const runtimeStore = runtimeProviderPage?.runtimeStore
      const storeApi = providerPage.store.current.api.current
      const stateFieldKey = 'search'

      const field = testBed.addField({
        api: storeApi,
        defaultValues: JSON.stringify('default value'),
        fieldType: testBed.getStringType(),
        key: stateFieldKey,
      })

      storeApi.writeCache({ fields: [field] })

      if (preRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          preRenderAction: testBed.addCodeAction({
            code: preRenderActionCode,
            name: 'preRenderAction',
            store: providerPage.store,
          }),
        })
      }

      if (postRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          postRenderAction: testBed.addCodeAction({
            code: postRenderActionCode,
            name: 'postRenderAction',
            store: providerPage.store,
          }),
        })
      }

      expect(runtimeStore?.state[stateFieldKey]).toBe('default value')

      const reactElement = testBed.addRenderer({
        containerNode: page,
        id: renderer.id,
        rendererType: RendererType.Preview,
      }).render

      render(
        React.createElement(
          StoreProvider,
          { value: rootApplicationStore },
          reactElement,
        ),
      )

      expect(runtimeStore?.state[stateFieldKey]).toBe(expectedValue)
    },
  )

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
