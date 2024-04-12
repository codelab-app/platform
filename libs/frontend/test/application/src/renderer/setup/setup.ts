import { RendererType } from '@codelab/frontend/abstract/application'
import { Store } from '@codelab/frontend/domain/store'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPageKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { v4 } from 'uuid'
import type { TestBed } from './testbed'

export const setupPages = (
  testbed: TestBed,
  rendererType: RendererType = RendererType.Preview,
  pageKind: IPageKind = IPageKind.Regular,
) => {
  const app = testbed.addApp({})
  const pageId = 'page-id'
  const pageName = 'Page Name'

  const htmlDivAtom = testbed.addAtom({
    __typename: 'Atom',
    name: 'HtmlDiv',
    type: IAtomType.HtmlDiv,
  })

  const page =
    pageKind === IPageKind.Regular
      ? testbed.addPage({
          app,
          id: pageId,
          kind: IPageKind.Regular,
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
      : app.providerPage

  const renderer = testbed.addRenderer({
    containerNode: page,
    id: v4(),
    rendererType,
  })

  return {
    app,
    page,
    rendered: renderer.render,
    renderer,
    runtimePage:
      pageKind === IPageKind.Regular
        ? renderer.runtimePage?.childPage?.current
        : renderer.runtimePage,
    runtimeProviderPage:
      pageKind === IPageKind.Regular ? renderer.runtimePage : undefined,
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

  const component = testbed.addComponent({
    id: componentId,
    name: componentName,
    rootElement: testbed.addElement({
      closestContainerNode: { id: componentId },
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
  })

  const runtimeComponent = renderer.runtimeComponent!

  return { component, renderer, runtimeComponent }
}

export const setupRuntimeElement = (
  testbed: TestBed,
  rendererType: RendererType = RendererType.Preview,
  pageKind: IPageKind = IPageKind.Regular,
) => {
  const { page, rendered, renderer, runtimePage } = setupPages(
    testbed,
    rendererType,
    pageKind,
  )

  const runtimeElement = runtimePage!.runtimeRootElement

  return {
    element: page.rootElement.current,
    page,
    rendered,
    renderer,
    runtimeElement,
  }
}
