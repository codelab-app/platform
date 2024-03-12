import { RendererType } from '@codelab/frontend/abstract/application'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { IPageKind } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React from 'react'
import { setupPages } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'
import { RuntimeElementModel } from '@codelab/frontend/application/renderer'

let testbed: TestBed

describe('Runtime Element', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
    testbed = new TestBed()
  })

  it('should create element runtime node', () => {
    const { runtimeElementService } = rootApplicationStore
    const { page, runtimePage } = setupPages(testbed)
    const rootElement = page.rootElement.current

    const runtimeElement = runtimeElementService.runtimeElement(
      RuntimeElementModel.compositeKey(rootElement),
    )

    // Test the creation of element node
    expect(runtimeElement?.element.id).toBe(rootElement.id)

    // Test the creation of link with container node
    expect(runtimeElement?.closestContainerNode.current.compositeKey).toBe(
      runtimePage?.compositeKey,
    )
  })

  it('should add element runtime child', () => {
    const { renderer } = setupPages(testbed)
    const runtimePage = renderer.runtimeRootContainerNode
    const runtimeRootElement = runtimePage.runtimeRootElement
    const rootElement = runtimeRootElement.element.current

    const childElement = testbed.addElement({
      name: 'child-element',
      parentElement: rootElement,
    })

    rootElement.writeCache({ firstChild: childElement })

    const runtimeChildElement = runtimeRootElement.children[0]
    const childCompositeKey = RuntimeElementModel.compositeKey(childElement)

    expect(runtimeChildElement?.compositeKey).toBe(childCompositeKey)
  })

  it('should detach runtime element when element is detached', async () => {
    const { elementService, runtimeElementService } = rootApplicationStore
    const { page } = setupPages(testbed, undefined, IPageKind.Provider)

    expect(runtimeElementService.elementsList.length).toEqual(1)

    elementService.elementDomainService.elements.delete(page.rootElement.id)

    expect(runtimeElementService.elementsList.length).toEqual(0)
  })

  it.each([[IPageKind.Provider], [IPageKind.Regular]])(
    'should resolve closest runtime container node when in %s',
    (pageKind) => {
      const { runtimePage, runtimeProviderPage } = setupPages(
        testbed,
        RendererType.Preview,
        pageKind,
      )

      const runtimeRootElement = runtimePage?.runtimeRootElement
      const runtimeProviderRootElement = runtimeProviderPage?.runtimeRootElement

      expect(runtimeRootElement?.closestContainerNode.id).toBe(
        runtimePage?.compositeKey,
      )

      if (pageKind === IPageKind.Provider) {
        expect(runtimeProviderPage).toBeUndefined()
      }

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
      const { rendererService } = rootApplicationStore
      const { page, renderer } = setupPages(testbed, RendererType.Preview)
      const providerPage = page.providerPage ?? page

      const runtimeProviderPage = rendererService.runtimePage(
        page.providerPage ?? page,
      )

      const runtimeStore = runtimeProviderPage?.runtimeStore
      const storeApi = providerPage.store.current.api.current
      const stateFieldKey = 'search'

      const field = testbed.addField({
        api: storeApi,
        defaultValues: JSON.stringify('default value'),
        fieldType: testbed.getStringType(),
        key: stateFieldKey,
      })

      storeApi.writeCache({ fields: [field] })

      if (preRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          preRenderAction: testbed.addCodeAction({
            code: preRenderActionCode,
            name: 'preRenderAction',
            store: providerPage.store,
          }),
        })
      }

      if (postRenderActionCode) {
        providerPage.rootElement.current.writeCache({
          postRenderAction: testbed.addCodeAction({
            code: postRenderActionCode,
            name: 'postRenderAction',
            store: providerPage.store,
          }),
        })
      }

      expect(runtimeStore?.state[stateFieldKey]).toBe('default value')

      const reactElement = testbed.addRenderer({
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
