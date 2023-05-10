/// <reference types='jest'/>

import type { IInterfaceType, IType } from '@codelab/frontend/abstract/core'
import {
  atomRef,
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  elementTreeRef,
  pageRef,
  propRef,
  RendererType,
  ROOT_ELEMENT_NAME,
  storeRef,
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
  IPageKind,
  IRenderTypeKind,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import { objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RenderService } from '../../render.service'
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
    .spyOn(rootStore.elementService.elementRepository, 'updateNodes')
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

    const integerType = new PrimitiveType({
      name: 'primitiveType',
      owner,
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    const stringType = new PrimitiveType({
      name: 'primitiveType',
      owner,
      primitiveKind: PrimitiveTypeKind.String,
    })

    const pageStore = new Store({
      actions: [],
      api: typeRef(emptyInterface.id) as Ref<IInterfaceType>,
      component: null,
      id: v4(),
      name: Store.createName({ name: 'Page' }),
      page: pageRef(pageId),
    })

    data.textField = new Field({
      api: typeRef(emptyInterface),
      id: v4(),
      key: CUSTOM_TEXT_PROP_KEY,
      name: CUSTOM_TEXT_PROP_KEY,
      type: typeRef(stringType.id),
    })

    data.renderPropType = new RenderPropType({
      name: 'renderPropType',
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
      builderRenderService: new RenderService({}),
      componentService: new ComponentService({}),
      elementService: new ElementService({}),
      fieldService: new FieldService({
        fields: objectMap([[data.textField.id, data.textField]]),
      }),
      pageService: new PageService({}),
      propService: new PropService({}),
      renderer: data.renderer,
      storeService: new StoreService({
        stores: objectMap([[pageStore.id, pageStore]]),
      }),
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

    const elementToRenderProp = {
      data: JSON.stringify({
        prop01: 'prop01Value',
        prop02: 'prop02Value',
        prop03: {
          type: integerType.id,
          value: 'prop03Value',
        },
      }),
    }

    data.element = await data.rootStore.elementService.create({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: elementToRenderProp,
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

    data.element.setPage(pageRef(pageId))

    data.rootStore.pageService.add({
      app: { id: v4() },
      id: pageId,
      kind: IPageKind.Regular,
      name: 'page',
      rootElement: elementRef(data.element),
      store: storeRef(pageStore.id),
      url: 'page-url',
    })

    const componentRootElementProps = await data.rootStore.propService.create({
      data: JSON.stringify({
        componentProp: 'original',
        [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
      }),
      id: v4(),
    })

    data.component = await data.rootStore.componentService.create({
      id: v4(),
      keyGenerator: `function run(props) {
        // props are of type component api
          return props.id
      }`,
      name: 'My Component',
      owner,
    })

    data.component.api.current.writeCache({
      fields: [{ id: data.textField.id }],
    })

    data.component.setChildrenContainerElement(elementRef(compRootElementId))
    data.component.rootElement.current.setRenderType(atomRef(textAtom))
    data.component.rootElement.current.setProps(
      propRef(componentRootElementProps),
    )

    data.componentInstance =
      await data.rootStore.elementService.createElementAsFirstChild({
        id: v4(),
        name: '01',
        parentElement: { id: data.element.id },
        props: { data: JSON.stringify({ componentProp: 'instance' }) },
        renderType: {
          id: data.component.id,
          kind: IRenderTypeKind.Component,
        },
      })

    const renderer = new Renderer({
      debugMode: false,
      elementTree: elementTreeRef(data.component),
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
