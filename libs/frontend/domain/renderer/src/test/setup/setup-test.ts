/// <reference types='jest'/>

import type { IInterfaceType, IType } from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  elementTreeRef,
  fieldRef,
  pageRef,
  rendererRef,
  RendererType,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { Atom, AtomService } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService } from '@codelab/frontend/domain/page'
import { PropService } from '@codelab/frontend/domain/prop'
import {
  ActionService,
  Store,
  StoreService,
} from '@codelab/frontend/domain/store'
import { TagService } from '@codelab/frontend/domain/tag'
import {
  Field,
  FieldService,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  TypeService,
} from '@codelab/frontend/domain/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPageKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import type { Ref } from 'mobx-keystone'
import { objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RenderService } from '../../render.service'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/pass-through-render-pipe'
import type { RenderPipeClass } from '../../renderPipes/render-pipe.factory'
import { renderPipeFactory } from '../../renderPipes/render-pipe.factory'
import { TestRootStore } from './test-root-store'
import type { ITestRootStore, TestServices } from './test-root-store.interface'

const stubServiceRepositories = (rootStore: ITestRootStore) => {
  jest
    .spyOn(rootStore.elementService.elementRepository, 'add')
    .mockImplementation()

  jest
    .spyOn(rootStore.elementService.elementRepository, 'updateNodes')
    .mockImplementation()

  jest
    .spyOn(rootStore.componentService.componentRepository, 'add')
    .mockImplementation()

  jest.spyOn(rootStore.storeService.storeRepository, 'add').mockImplementation()
  jest.spyOn(rootStore.propService.propRepository, 'add').mockImplementation()
}

// Clone everything so that we don't get conflicts between different test files.
export const setupTestForRenderer = (
  pipes: Array<RenderPipeClass> = [],
  rendererType: RendererType = RendererType.PageBuilder,
) => {
  const data: TestServices = {} as TestServices

  beforeEach(async () => {
    const pageId = v4()
    const pageStoreId = v4()
    const compRootElementId = v4()
    const emptyInterface = new InterfaceType({ name: 'Empty interface' })
    const componentName = 'My Component'

    const divAtom = new Atom({
      api: typeRef(emptyInterface),
      name: 'Html Div',
      tags: [],
      type: IAtomType.HtmlDiv,
    })

    const textAtom = new Atom({
      api: typeRef(emptyInterface),
      name: 'Text',
      tags: [],
      type: IAtomType.Text,
    })

    const integerType = new PrimitiveType({
      name: 'primitiveType',
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    const stringType = new PrimitiveType({
      name: 'primitiveType',
      primitiveKind: PrimitiveTypeKind.String,
    })

    data.textField = new Field({
      api: typeRef(emptyInterface),
      id: v4(),
      key: CUSTOM_TEXT_PROP_KEY,
      name: CUSTOM_TEXT_PROP_KEY,
      type: typeRef(stringType.id),
    })

    data.componentField = new Field({
      api: typeRef(emptyInterface),
      defaultValues: 'component prop default',
      id: v4(),
      key: 'rootComponentProp',
      name: 'Root Component Prop',
      prevSibling: fieldRef(data.textField.id),
      type: typeRef(stringType.id),
    })

    data.renderPropType = new RenderPropType({
      name: 'renderPropType',
    })

    data.reactNodeType = new ReactNodeType({
      name: 'reactNodeType',
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
      fieldService: new FieldService({
        fields: objectMap([
          [data.textField.id, data.textField],
          [data.componentField.id, data.componentField],
        ]),
      }),
      pageService: new PageService({}),
      propService: new PropService({}),
      renderer: data.renderer,
      renderService: new RenderService({}),
      storeService: new StoreService({}),
      tagService: new TagService({}),
      typeService: new TypeService({
        types: objectMap<IType>([
          [integerType.id, integerType],
          [stringType.id, stringType],
          [data.renderPropType.id, data.renderPropType],
          [data.reactNodeType.id, data.reactNodeType],
          [emptyInterface.id, emptyInterface],
        ]),
      }),
    })

    stubServiceRepositories(data.rootStore)

    const elementToRenderProp = data.rootStore.propService.add({
      data: JSON.stringify({
        prop01: 'prop01Value',
        prop02: 'prop02Value',
        prop03: {
          kind: integerType.kind,
          type: integerType.id,
          value: 'prop03Value',
        },
      }),
      id: v4(),
    })

    data.element = await data.rootStore.elementService.add({
      closestContainerNode: {
        id: pageId,
      },
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: {
        id: pageId,
      },
      props: {
        data: '{}',
        id: elementToRenderProp.id,
      },
      renderType: { __typename: IElementRenderTypeKind.Atom, id: divAtom.id },
    })

    data.rootStore.pageService.add({
      app: { id: v4() },
      id: pageId,
      kind: IPageKind.Regular,
      name: 'page',
      rootElement: elementRef(data.element),
      store: { id: pageStoreId },
      url: 'page-url',
    })

    data.rootStore.storeService.add({
      actions: [],
      api: typeRef(emptyInterface.id) as Ref<IInterfaceType>,
      component: null,
      id: pageStoreId,
      name: Store.createName({ name: 'Page' }),
      page: pageRef(pageId),
    })

    const componentRootElementProps = await data.rootStore.propService.add({
      data: JSON.stringify({
        componentProp: 'original',
        [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
        expressionProp: `expression value - {{componentProps.${data.componentField.key}}}`,
      }),
      id: v4(),
    })

    const storeApi = data.rootStore.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${componentName} Store`),
    })

    const store = data.rootStore.storeService.add({
      api: typeRef<IInterfaceType>(storeApi.id),
      id: v4(),
      name: Store.createName({ name: componentName }),
    })

    const componentId = v4()

    const rootElement = data.rootStore.elementService.add({
      closestContainerNode: {
        id: componentId,
      },
      id: v4(),
      name: `${componentName} Root`,
      parentComponent: { id: componentId },
      props: {
        data: componentRootElementProps.jsonString,
        id: componentRootElementProps.id,
      },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: textAtom.id,
      },
    })

    const api = data.rootStore.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(componentName),
    })

    const componentProps = data.rootStore.propService.add({
      data: '{}',
      id: v4(),
    })

    data.component = await data.rootStore.componentService.add({
      api: {
        id: api.id,
      },
      childrenContainerElement: elementRef(compRootElementId),
      id: componentId,
      keyGenerator: `function run(props) {
        // props are of type component api
          return props.id
      }`,
      name: componentName,
      props: {
        data: '{}',
        id: componentProps.id,
      },
      rootElement,
      store,
    })

    data.component.api.current.writeCache({
      fields: [{ id: data.textField.id }, { id: data.componentField.id }],
    })

    data.componentInstance =
      await data.rootStore.elementService.createElementService.createElementAsFirstChild(
        {
          closestContainerNode: {
            id: data.component.id,
          },
          id: v4(),
          name: '01',
          parentComponent: { id: data.component.id },
          parentElement: { id: data.element.id },
          props: {
            data: JSON.stringify({
              componentProp: 'instance',
              [data.componentField.key]: 'component instance prop',
            }),
            id: v4(),
          },
          renderType: {
            __typename: IElementRenderTypeKind.Component,
            id: data.component.id,
          },
        },
      )

    const renderer = new Renderer({
      debugMode: false,
      elementTree: elementTreeRef(data.component),
      rendererType,
      renderPipe: renderPipeFactory([PassThroughRenderPipe, ...pipes]),
    })

    data.rootStore.setRenderer(renderer)
    data.rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}
