/// <reference types='jest'/>

import type { IType } from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  elementTreeRef,
  IRenderTypeKind,
  RendererType,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { Atom, atomRef, AtomService } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService } from '@codelab/frontend/domain/page'
import { propRef, PropService } from '@codelab/frontend/domain/prop'
import { ActionService, StoreService } from '@codelab/frontend/domain/store'
import { TagService } from '@codelab/frontend/domain/tag'
import {
  FieldService,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  typeRef,
  TypeService,
} from '@codelab/frontend/domain/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/passThroughRenderPipe'
import type { RenderPipeClass } from '../../renderPipes/renderPipe.factory'
import { renderPipeFactory } from '../../renderPipes/renderPipe.factory'
import { TestRootStore } from './test-root-store'
import type { ITestRootStore, TestServices } from './test-root-store.interface'

const stubServiceRepositories = (rootStore: ITestRootStore) => {
  jest
    .spyOn(rootStore.elementService.elementRepository, 'add')
    .mockImplementation()

  jest
    .spyOn(rootStore.componentService.componentRepository, 'add')
    .mockImplementation()

  jest.spyOn(rootStore.storeService.storeRepository, 'add').mockImplementation()
  jest.spyOn(rootStore.propService.propRepository, 'add').mockImplementation()
}

// Clone everything so that we don't get conflicts between different test files.
export const setupTestForRenderer = (pipes: Array<RenderPipeClass> = []) => {
  const data: TestServices = {} as TestServices

  beforeEach(async () => {
    const owner = { auth0Id: v4() }
    const pageId = v4()
    const compRootElementId = v4()
    const emptyInterface = new InterfaceType({ name: 'Empty interface', owner })

    const divAtom = new Atom({
      api: typeRef(emptyInterface),
      name: 'Html Div',
      owner,
      tags: [],
      type: IAtomType.HtmlDiv,
    })

    const textAtom = new Atom({
      api: typeRef(emptyInterface),
      name: 'Text',
      owner,
      tags: [],
      type: IAtomType.Text,
    })

    const primitiveType = new PrimitiveType({
      name: 'primitiveType',
      owner,
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    data.renderPropsType = new RenderPropsType({
      name: 'renderPropsType',
      owner,
    })

    data.reactNodeType = new ReactNodeType({
      name: 'reactNodeType',
      owner,
    })

    data.rootStore = new TestRootStore({
      actionService: new ActionService({}),
      atomService: new AtomService({
        atoms: objectMap([
          [divAtom.id, divAtom],
          [textAtom.id, textAtom],
        ]),
      }),
      componentService: new ComponentService({}),
      elementService: new ElementService({}),
      fieldService: new FieldService({}),
      pageService: new PageService({}),
      propService: new PropService({}),
      renderer: data.renderer,
      storeService: new StoreService({}),
      tagService: new TagService({}),
      typeService: new TypeService({
        types: objectMap<IType>([
          [primitiveType.id, primitiveType],
          [data.renderPropsType.id, data.renderPropsType],
          [data.reactNodeType.id, data.reactNodeType],
          [emptyInterface.id, emptyInterface],
        ]),
      }),
    })

    stubServiceRepositories(data.rootStore)

    const elementToRenderProps = {
      data: JSON.stringify({
        prop01: 'prop01Value',
        prop02: 'prop02Value',
        prop03: {
          type: primitiveType.id,
          value: 'prop03Value',
        },
      }),
    }

    data.elementToRender = await data.rootStore.elementService.create({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: { id: pageId },
      props: elementToRenderProps,
      propTransformationJs: `
        // Write a transformer function, you get the input props as parameter
        // All returned props will get merged with the original ones
        function transform(props) {
          return Object.keys(props)
            .map((x)=> ({
              [\`$\{x}-edited\`] : props[x]
            }))
            .reduce((total,current) =>
              ({...total,...current}),
              {}
            )
          }
      `,
      renderType: { id: divAtom.id, kind: IRenderTypeKind.Atom },
    })

    data.store = await data.rootStore.storeService.create({
      api: typeRef(emptyInterface),
      id: v4(),
      name: 'Store',
    })

    data.rootStore.pageService.add({
      app: { id: v4() },
      id: pageId,
      kind: IPageKind.Regular,
      name: 'page',
      rootElement: elementRef(data.elementToRender),
      store: data.store,
    })

    const componentRootElementProps = await data.rootStore.propService.create({
      data: JSON.stringify({
        componentProp: 'original',
        [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
      }),
      id: v4(),
    })

    data.componentToRender = await data.rootStore.componentService.create({
      api: typeRef(emptyInterface),
      childrenContainerElement: { id: compRootElementId },
      id: v4(),
      name: 'My Component',
      owner,
      rootElement: { id: compRootElementId },
    })
    data.componentToRender.rootElement.current.setRenderType(atomRef(textAtom))
    data.componentToRender.rootElement.current.setProps(
      propRef(componentRootElementProps),
    )

    data.componentInstanceElementToRender =
      await data.rootStore.elementService.create({
        id: v4(),
        name: '01',
        parentComponent: data.componentToRender,
        props: { data: JSON.stringify({ componentProp: 'instance' }) },
        renderType: {
          id: data.componentToRender.id,
          kind: IRenderTypeKind.Component,
        },
      })

    const renderer = new Renderer({
      debugMode: false,
      elementTree: elementTreeRef(data.componentToRender),
      rendererType: RendererType.PageBuilder,
      renderPipe: renderPipeFactory([PassThroughRenderPipe, ...pipes]),
    })

    data.rootStore.setRenderer(renderer)
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}
