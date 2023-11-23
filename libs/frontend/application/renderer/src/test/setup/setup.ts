import { RendererType } from '@codelab/frontend/abstract/application'
import { Store } from '@codelab/frontend/domain/store'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { defaultPipes, renderPipeFactory } from '../../renderPipes'
import { rootApplicationStore } from './root.test.store'
import type { TestBed } from './testbed'

export const setupPage = (testbed: TestBed) => {
  const pageId = 'page-id'
  const pageName = 'Page Name'
  const htmlDivAtom = testbed.addAtom({ type: IAtomType.HtmlDiv })
  const app = testbed.addApp({})

  const page = testbed.addPage({
    app,
    id: pageId,
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

  const renderer = testbed.render({
    containerNode: page,
    rendererType: RendererType.PageBuilder,
    renderPipe: renderPipeFactory(defaultPipes),
  })

  return {
    app,
    page,
    renderer,
  }
}

export const setupComponent = (testbed: TestBed) => {
  const componentId = 'component-id'
  const rootElementId = 'root-element-id'
  const componentName = 'Component Name'
  const htmlDivAtom = testbed.addAtom({ type: IAtomType.HtmlDiv })

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

  const renderer = testbed.render({
    containerNode: component,
    rendererType: RendererType.ComponentBuilder,
    renderPipe: renderPipeFactory(defaultPipes),
  })

  return { childrenContainerElement, component, renderer }
}

export const setupRuntimeElement = (testbed: TestBed) => {
  const { rendererService } = rootApplicationStore
  const { page } = setupPage(testbed)

  return {
    element: page.rootElement.current,
    runtimeElement: rendererService.runtimeElement(page.rootElement.current),
  }
}
