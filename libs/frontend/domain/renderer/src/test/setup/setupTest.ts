/// <reference types='jest'/>

import type {
  IAtom,
  IComponent,
  IElement,
  IInterfaceType,
  IRenderer,
  IStore,
} from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { Atom, atomRef, AtomService } from '@codelab/frontend/domain/atom'
import { Component, ComponentService } from '@codelab/frontend/domain/component'
import {
  Element,
  ElementService,
  ElementTree,
} from '@codelab/frontend/domain/element'
import { Prop } from '@codelab/frontend/domain/prop'
import {
  ActionService,
  Store,
  storeRef,
  StoreService,
} from '@codelab/frontend/domain/store'
import type { AnyTypeModel } from '@codelab/frontend/domain/type'
import {
  FieldService,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  typeRef,
  TypeService,
} from '@codelab/frontend/domain/type'
import { componentRef } from '@codelab/frontend/presenter/container'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import { frozen, objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/passThroughRenderPipe'
import type { RenderPipeClass } from '../../renderPipes/renderPipe.factory'
import { renderPipeFactory } from '../../renderPipes/renderPipe.factory'
import { RenderTestRootStore } from './renderTestRootStore'

interface TestingData {
  rootStore: RenderTestRootStore
  renderer: IRenderer
  componentToRender: IComponent
  componentRootElement: IElement
  elementToRender: IElement
  elementToRender02: IElement
  componentInstanceElementToRender: IElement
  renderPropsType: AnyTypeModel
  reactNodeType: AnyTypeModel
  primitiveType: AnyTypeModel
  emptyInterface: AnyTypeModel
  divAtom: IAtom
  textAtom: IAtom
  store: IStore
}

// Clone everything so that we don't get conflicts between different test files.
export const setupTestForRenderer = (pipes: Array<RenderPipeClass> = []) => {
  const data: TestingData = {} as TestingData

  beforeEach(() => {
    const ownerId = v4()
    const pageId = v4()
    data.emptyInterface = new InterfaceType({
      name: 'Empty interface',
      ownerId,
    })

    data.store = new Store({
      api: typeRef(data.emptyInterface) as Ref<IInterfaceType>,
      name: 'Store',
    })

    data.primitiveType = new PrimitiveType({
      id: v4(),
      name: 'primitiveType',
      primitiveKind: PrimitiveTypeKind.Integer,
      ownerId,
    })

    data.renderPropsType = new RenderPropsType({
      id: v4(),
      name: 'renderPropsType',
      ownerId,
    })

    data.reactNodeType = new ReactNodeType({
      id: v4(),
      name: 'reactNodeType',
      ownerId,
    })

    data.divAtom = new Atom({
      name: 'Html Div',
      id: v4(),
      type: IAtomType.HtmlDiv,
      api: typeRef(data.emptyInterface),
      tags: [],
    })

    data.textAtom = new Atom({
      name: 'Text',
      id: v4(),
      type: IAtomType.Text,
      api: typeRef(data.emptyInterface),
      tags: [],
    })

    data.elementToRender02 = new Element({
      id: v4(),
      name: '02',
      slug: '02-slug',
      props: new Prop({}),
    })

    const compRootElementId = v4()

    data.componentToRender = new Component({
      id: v4(),
      name: 'My Component',
      rootElementId: compRootElementId,
      ownerId: v4(),
      api: typeRef(data.emptyInterface),
      childrenContainerElementId: compRootElementId,
    })

    data.componentRootElement = new Element({
      id: compRootElementId,
      slug: `${compRootElementId}-01`,
      name: '01',
      customCss: '',
      guiCss: '',
      atom: atomRef(data.textAtom.id),
      parentComponent: componentRef(data.componentToRender.id),
      props: new Prop({
        id: v4(),
        data: frozen({
          componentProp: 'original',
          [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
        }),
      }),
    })

    data.elementToRender = new Element({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      slug: `${ROOT_ELEMENT_NAME}-slug`,
      customCss: '',
      pageId,
      guiCss: '',
      atom: atomRef(data.divAtom.id),
      props: new Prop({
        id: v4(),
        data: frozen({
          prop01: 'prop01Value',
          prop02: 'prop02Value',
          prop03: {
            type: data.primitiveType.id,
            value: 'prop03Value',
          },
        }),
      }),
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
    })

    data.componentInstanceElementToRender = new Element({
      id: v4(),
      name: '01',
      slug: 'component01.01-slug',
      renderComponentType: componentRef(data.componentToRender),
      props: new Prop({
        id: v4(),
        data: frozen({
          componentProp: 'instance',
        }),
      }),
      parentId: data.elementToRender.id,
    })

    data.componentInstanceElementToRender = new Element({
      id: v4(),
      name: '01',
      slug: '01-instance',
      renderComponentType: componentRef(data.componentToRender),
      props: new Prop({
        id: v4(),
        data: frozen({
          componentProp: 'instance',
        }),
      }),
    })

    const typeService = new TypeService({
      types: objectMap([
        [data.primitiveType.id, data.primitiveType],
        [data.renderPropsType.id, data.renderPropsType as AnyTypeModel],
        [data.reactNodeType.id, data.reactNodeType],
        [data.emptyInterface.id, data.emptyInterface],
      ]),
    })

    data.renderer = new Renderer({
      debugMode: false,
      appStore: storeRef(data.store),
      renderPipe: renderPipeFactory([PassThroughRenderPipe, ...pipes]),
    })

    data.rootStore = new RenderTestRootStore({
      storeService: new StoreService({
        stores: objectMap([[data.store.id, data.store]]),
      }),
      typeService,
      componentService: new ComponentService({
        components: objectMap([
          [data.componentToRender.id, data.componentToRender],
        ]),
      }),
      atomService: new AtomService({
        atoms: objectMap([
          [data.divAtom.id, data.divAtom],
          [data.textAtom.id, data.textAtom],
        ]),
      }),
      renderer: data.renderer,
      fieldService: new FieldService({}),
      actionService: new ActionService({}),
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
      pageElementTree: ElementTree.init(data.componentRootElement, [
        data.componentRootElement,
      ]),
    })

    data.componentToRender.setElementTree(
      ElementTree.init(data.componentRootElement, [data.componentRootElement]),
    )

    data.renderer.initForce(data.rootStore.pageElementTree)
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}
