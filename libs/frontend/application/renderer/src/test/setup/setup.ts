import { RendererType } from '@codelab/frontend/abstract/application'
import { Store } from '@codelab/frontend/domain/store'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPageKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { defaultPipes, renderPipeFactory } from '../../renderPipes'
import { rootApplicationStore } from './root.test.store'
import type { TestBed } from './testbed'

export const setupPages = (
  testbed: TestBed,
  rendererType: RendererType = RendererType.Preview,
  renderedPageKind: IPageKind = IPageKind.Provider,
) => {
  const rendererId = 'renderer-id'
  const pageId = 'page-id'
  const pageName = 'Page Name'
  const regularPageId = 'regular-page-id'
  const regularPageName = 'Regular Page Name'
  const isProviderPage = renderedPageKind === IPageKind.Provider

  const htmlDivAtom = testbed.addAtom({
    __typename: 'Atom',
    name: 'HtmlDiv',
    type: IAtomType.HtmlDiv,
  })

  const app = testbed.addApp({})

  const page = testbed.addPage({
    app,
    id: pageId,
    kind: IPageKind.Provider,
    name: pageName,
    rootElement: testbed.addElement({
      closestContainerNode: { id: pageId },
      name: ROOT_ELEMENT_NAME,
      page: { id: pageId },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: htmlDivAtom.id,
      },
    }),
    store: testbed.addStore({
      name: Store.createName({ name: pageName }),
      page: { id: pageId },
    }),
  })

  const regularPage = testbed.addPage({
    app,
    id: regularPageId,
    kind: IPageKind.Regular,
    name: regularPageName,
    rootElement: testbed.addElement({
      closestContainerNode: { id: regularPageId },
      name: ROOT_ELEMENT_NAME,
      page: { id: regularPageId },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: htmlDivAtom.id,
      },
    }),
    store: testbed.addStore({
      name: Store.createName({ name: regularPageName }),
      page: { id: regularPageId },
    }),
  })

  const renderer = testbed.addRenderer({
    containerNode: isProviderPage ? page : regularPage,
    id: rendererId,
    rendererType,
    renderPipe: renderPipeFactory(defaultPipes),
  })

  return {
    app,
    page: isProviderPage ? page : regularPage,
    rendered: renderer.render,
    renderer,
    rendererId,
  }
}

export const setupComponent = (testbed: TestBed) => {
  const componentId = 'component-id'
  const rootElementId = 'root-element-id'
  const componentName = 'Component Name'

  const htmlDivAtom = testbed.addAtom({
    __typename: 'Atom',
    name: 'HtmlDiv',
    type: IAtomType.HtmlDiv,
  })

  const childrenContainerElement = testbed.addElement({
    closestContainerNode: { id: componentId },
    name: 'children container',
    parentElement: { id: rootElementId },
    renderType: {
      __typename: IElementRenderTypeKind.Atom,
      id: htmlDivAtom.id,
    },
  })

  const component = testbed.addComponent({
    childrenContainerElement,
    id: componentId,
    name: componentName,
    rootElement: testbed.addElement({
      closestContainerNode: { id: componentId },
      firstChild: childrenContainerElement,
      name: ROOT_ELEMENT_NAME,
      parentComponent: { id: componentId },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: htmlDivAtom.id,
      },
    }),
    store: testbed.addStore({
      component: { id: componentId },
      name: Store.createName({ name: componentName }),
    }),
  })

  const renderer = testbed.addRenderer({
    containerNode: component,
    rendererType: RendererType.Preview,
    renderPipe: renderPipeFactory(defaultPipes),
  })

  return { childrenContainerElement, component, renderer }
}

export const setupRuntimeElement = (
  testbed: TestBed,
  rendererType: RendererType = RendererType.Preview,
  renderedPageKind: IPageKind = IPageKind.Provider,
) => {
  const { rendererService } = rootApplicationStore

  const { page, rendered, renderer, rendererId } = setupPages(
    testbed,
    rendererType,
    renderedPageKind,
  )

  return {
    element: page.rootElement.current,
    page,
    rendered,
    renderer,
    rendererId,
    runtimeElement: rendererService.runtimeElement(page.rootElement.current)!,
  }
}
