/// <reference types='jest'/>

import type { IType } from '@codelab/frontend/abstract/core'
import {
  componentRef,
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  RendererType,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { Atom, atomRef, AtomService } from '@codelab/frontend/domain/atom'
import { Component, ComponentService } from '@codelab/frontend/domain/component'
import {
  Element,
  ElementService,
  ElementTree,
  elementTreeRef,
} from '@codelab/frontend/domain/element'
import { pageRef } from '@codelab/frontend/domain/page'
import { Prop, propRef, PropService } from '@codelab/frontend/domain/prop'
import {
  ActionService,
  Store,
  storeRef,
  StoreService,
} from '@codelab/frontend/domain/store'
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
import { IAtomType } from '@codelab/shared/abstract/core'
import { frozen, objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/passThroughRenderPipe'
import type { RenderPipeClass } from '../../renderPipes/renderPipe.factory'
import { renderPipeFactory } from '../../renderPipes/renderPipe.factory'
import { TestRootStore } from './test-root-store'
import type { TestServices } from './test-root-store.interface'

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
      name: 'Store',
    })

    data.primitiveType = new PrimitiveType({
      id: v4(),
      name: 'primitiveType',
      owner,
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    data.renderPropsType = new RenderPropsType({
      id: v4(),
      name: 'renderPropsType',
      owner,
    })

    data.reactNodeType = new ReactNodeType({
      id: v4(),
      name: 'reactNodeType',
      owner,
    })

    data.divAtom = new Atom({
      api: typeRef(data.emptyInterface),
      id: v4(),
      name: 'Html Div',
      owner,
      tags: [],
      type: IAtomType.HtmlDiv,
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

    data.componentToRender = new Component({
      api: typeRef(data.emptyInterface),
      childrenContainerElement: elementRef(compRootElementId),
      id: v4(),
      name: 'My Component',
      owner,
      rootElement: elementRef(compRootElementId),
    })

    data.componentRootElementProps = new Prop({
      data: frozen({
        componentProp: 'original',
        [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
      }),
      id: v4(),
    })

    data.componentRootElement = new Element({
      customCss: '',
      guiCss: '',
      id: compRootElementId,
      name: '01',
      parentComponent: componentRef(data.componentToRender.id),
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
      customCss: '',
      guiCss: '',
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: pageRef(pageId),
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
        [data.renderPropsType.id, data.renderPropsType],
        [data.reactNodeType.id, data.reactNodeType],
        [data.emptyInterface.id, data.emptyInterface],
      ]),
    })

    data.renderer = new Renderer({
      appStore: storeRef(data.store),
      debugMode: false,
      elementTree: elementTreeRef(new ElementTree({})),
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
      pageElementTree: ElementTree.init(data.componentRootElement, [
        data.componentRootElement,
      ]),
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
