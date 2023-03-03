/// <reference types='jest'/>

import type { IType } from '@codelab/frontend/abstract/core'
import {
  componentRef,
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  elementTreeRef,
  pageRef,
  RendererType,
  ROOT_ELEMENT_NAME,
  storeRef,
} from '@codelab/frontend/abstract/core'
import { Atom, atomRef, AtomService } from '@codelab/frontend/domain/atom'
import { Component, ComponentService } from '@codelab/frontend/domain/component'
import { Element, ElementService } from '@codelab/frontend/domain/element'
import { PageService } from '@codelab/frontend/domain/page'
import { Prop, propRef, PropService } from '@codelab/frontend/domain/prop'
import {
  ActionService,
  Store,
  StoreService,
} from '@codelab/frontend/domain/store'
import { TagService } from '@codelab/frontend/domain/tag'
import {
  FieldService,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  typeRef,
  TypeService,
} from '@codelab/frontend/domain/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IAtomType, IRenderTypeKind } from '@codelab/shared/abstract/core'
import { frozen, objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RenderService } from '../../render.service'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/passThroughRenderPipe'
import type { RenderPipeClass } from '../../renderPipes/renderPipe.factory'
import { renderPipeFactory } from '../../renderPipes/renderPipe.factory'
import { TestRootStore } from './test-root-store'
import type { ITestRootStore, TestServices } from './test-root-store.interface'

// Clone everything so that we don't get conflicts between different test files.
export const setupTestForRenderer = (pipes: Array<RenderPipeClass> = []) => {
  const data: TestServices = {} as TestServices

  beforeEach(() => {
    const owner = { auth0Id: v4() }
    const pageId = v4()
    data.emptyInterface = new InterfaceType({
      name: 'Empty interface',
      owner,
    })

    data.store = new Store({
      api: typeRef(data.emptyInterface),
      component: null,
      name: 'Store',
      page: null,
    })

    data.primitiveType = new PrimitiveType({
      id: v4(),
      name: 'primitiveType',
      owner,
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    data.renderPropType = new RenderPropType({
      name: 'renderPropType',
      owner,
    })

    data.reactNodeType = new ReactNodeType({
      id: v4(),
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
      fieldService: new FieldService({}),
      pageService: new PageService({}),
      propService: new PropService({}),
      renderer: data.renderer,
      storeService: new StoreService({}),
      tagService: new TagService({}),
      typeService: new TypeService({
        types: objectMap<IType>([
          [integerType.id, integerType],
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
          type: primitiveType.id,
          value: 'prop03Value',
        },
      }),
    }

    data.elementToRender = await data.rootStore.elementService.create({
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

    data.textAtom = new Atom({
      api: typeRef(data.emptyInterface),
      id: v4(),
      name: 'Text',
      owner,
      tags: [],
      type: IAtomType.Text,
    })

    data.elementToRender02Props = new Prop({ id: v4() })

    data.elementToRender02 = new Element({
      id: v4(),
      name: '02',
      props: propRef(data.elementToRender02Props.id),
    })

    const compRootElementId = v4()
    const componentProps = new Prop({ id: v4() })

    data.componentToRender = new Component({
      api: typeRef(data.emptyInterface),
      childrenContainerElement: elementRef(compRootElementId),
      id: v4(),
      name: 'My Component',
      owner,
      props: propRef(componentProps),
      rootElement: elementRef(compRootElementId),
      store: storeRef(data.store.id),
    })

    data.componentRootElementProps = new Prop({
      data: frozen({
        componentProp: 'original',
        [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
      }),
      id: v4(),
    })

    data.componentRootElement = new Element({
      _parentComponent: componentRef(data.componentToRender.id),
      customCss: '',
      guiCss: '',
      id: compRootElementId,
      name: '01',
      props: propRef(data.componentRootElementProps.id),
      renderType: atomRef(data.textAtom.id),
    })

    data.elementToRenderProps = new Prop({
      data: frozen({
        prop01: 'prop01Value',
        prop02: 'prop02Value',
        prop03: {
          type: data.primitiveType.id,
          value: 'prop03Value',
        },
      }),
      id: v4(),
    })

    data.elementToRender = new Element({
      _page: pageRef(pageId),
      customCss: '',
      guiCss: '',
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: propRef(data.elementToRenderProps.id),
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
      }`,
      renderType: atomRef(data.divAtom.id),
    })

    data.componentInstanceElementToRenderProps = new Prop({
      data: frozen({
        componentProp: 'instance',
      }),
      id: v4(),
    })

    data.componentInstanceElementToRender = new Element({
      id: v4(),
      name: '01',
      props: propRef(data.componentInstanceElementToRenderProps.id),
      renderType: componentRef(data.componentToRender),
    })

    const typeService = new TypeService({
      types: objectMap<IType>([
        [data.primitiveType.id, data.primitiveType],
        [data.renderPropType.id, data.renderPropType],
        [data.reactNodeType.id, data.reactNodeType],
        [data.emptyInterface.id, data.emptyInterface],
      ]),
    })

    data.renderer = new Renderer({
      debugMode: false,
      elementTree: elementTreeRef(data.componentToRender),
      rendererType: RendererType.PageBuilder,
      renderPipe: renderPipeFactory([PassThroughRenderPipe, ...pipes]),
    })

    data.rootStore = new TestRootStore({
      actionService: new ActionService({}),
      atomService: new AtomService({
        atoms: objectMap([
          [data.divAtom.id, data.divAtom],
          [data.textAtom.id, data.textAtom],
        ]),
      }),
      componentService: new ComponentService({
        components: objectMap([
          [data.componentToRender.id, data.componentToRender],
        ]),
      }),
      elementService: new ElementService({
        elements: objectMap([
          [data.elementToRender.id, data.elementToRender],
          [data.elementToRender02.id, data.elementToRender02],
          [
            data.componentInstanceElementToRender.id,
            data.componentInstanceElementToRender,
          ],
          [data.componentRootElement.id, data.componentRootElement],
        ]),
      }),
      fieldService: new FieldService({}),
      propService: new PropService({
        props: objectMap([
          [data.elementToRenderProps.id, data.elementToRenderProps],
          [data.elementToRender02.id, data.elementToRender02Props],
          [data.componentRootElementProps.id, data.componentRootElementProps],
          [
            data.componentInstanceElementToRenderProps.id,
            data.componentInstanceElementToRenderProps,
          ],
        ]),
      }),
      renderer: data.renderer,
      storeService: new StoreService({
        stores: objectMap([[data.store.id, data.store]]),
      }),
      typeService,
    })
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}

function stubServiceRepositories(rootStore: ITestRootStore) {
  throw new Error('Function not implemented.')
}
