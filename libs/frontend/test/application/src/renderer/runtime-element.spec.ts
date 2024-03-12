import {
  type IRuntimeElementModel,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { IPageKind } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React from 'react'
import { setupPages } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('Runtime Element', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
    testbed = new TestBed()
  })

  it('should create element runtime node', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPages(testbed)
    const rootElement = page.rootElement.current
    const runtimeElement = rendererService.runtimeElement(rootElement)

    // Test the creation of element node
    expect(runtimeElement?.element.id).toBe(rootElement.id)

    // Test the creation of link with container node
    expect(runtimeElement?.closestContainerNode.current.containerNode.id).toBe(
      page.id,
    )
  })

  it('should add element runtime child', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPages(testbed)
    const rootElement = page.rootElement.current
    const runtimeElement = rendererService.runtimeElement(rootElement)

    const childElement = testbed.addElement({
      name: 'child-element',
      parentElement: rootElement,
    })

    rootElement.writeCache({ firstChild: childElement })

    const runtimeChildElement = runtimeElement
      ?.children[0] as IRuntimeElementModel

    expect(runtimeChildElement.element.id).toBe(childElement.id)
  })

  it('should detach runtime element when element is detached', async () => {
    const { elementService, rendererService } = rootApplicationStore
    const { page } = setupPages(testbed)
    const rootElement = page.rootElement.current
    const runtimeElement = rendererService.runtimeElement(rootElement)
    const runtimePage = runtimeElement?.closestContainerNode.current

    expect(runtimePage?.runtimeElementsList.length).toEqual(1)

    elementService.elementDomainService.elements.delete(rootElement.id)

    expect(runtimePage?.runtimeElementsList.length).toEqual(0)
  })

  it.each([[IPageKind.Provider], [IPageKind.Regular]])(
    'should resolve closest runtime container node when in %s',
    (pageKind) => {
      const { rendererService } = rootApplicationStore
      const { page } = setupPages(testbed, RendererType.Preview, pageKind)
      const pageRootElement = page.rootElement.current
      const providerPageRootElement = page.providerPage?.rootElement.current

      const runtimeProviderPage = page.providerPage
        ? rendererService.runtimeContainerNode(page.providerPage)
        : undefined

      const runtimePage = rendererService.runtimeContainerNode(page)

      const pageRuntimeRootElement =
        rendererService.runtimeElement(pageRootElement)

      const providerPageRuntimeRootElement = providerPageRootElement
        ? rendererService.runtimeElement(providerPageRootElement)
        : undefined

      expect(pageRuntimeRootElement?.closestContainerNode.id).toBe(
        runtimePage?.id,
      )

      if (pageKind === IPageKind.Provider) {
        expect(runtimeProviderPage?.id).toBeUndefined()
      }

      expect(providerPageRuntimeRootElement?.closestContainerNode.id).toBe(
        runtimeProviderPage?.id,
      )
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

      const { page, rendererId } = setupPages(
        testbed,
        RendererType.Preview,
        pageKind,
      )

      const providerPage = page.providerPage ?? page

      const runtimeProviderPage = rendererService.runtimeContainerNode(
        page.providerPage ?? page,
      )

      const runtimeStore = runtimeProviderPage?.runtimeStore
      const storeApi = providerPage.store.current.api.current
      const stateFieldKey = 'search'

      const field = testbed.addField({
        api: storeApi,
        defaultValues: 'default value',
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
        id: rendererId,
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
