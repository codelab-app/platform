/// <reference types='jest'/>

import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { Atom, atomRef, AtomService } from '@codelab/frontend/modules/atom'
import {
  Component,
  ComponentService,
} from '@codelab/frontend/modules/component'
import {
  CUSTOM_TEXT_PROP_KEY,
  Element,
  ElementService,
  ElementTree,
  Prop,
} from '@codelab/frontend/modules/element'
import {
  AnyType,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  typeRef,
  TypeService,
} from '@codelab/frontend/modules/type'
import {
  componentRef,
  elementServiceContext,
} from '@codelab/frontend/presenter/container'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import { frozen, objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/passThroughRenderPipe'
import {
  RenderPipeClass,
  renderPipeFactory,
} from '../../renderPipes/renderPipe.factory'
import { RenderTestRootStore } from './renderTestRootStore'

// Clone everything so that we don't get conflicts between different test files
export const setupTestForRenderer = (pipes: Array<RenderPipeClass> = []) => {
  const data: {
    rootStore: RenderTestRootStore
    renderer: Renderer
    componentToRender: Component
    componentRootElement: Element
    elementToRender: Element
    elementToRender02: Element
    componentInstanceElementToRender: Element
    renderPropsType: AnyType
    reactNodeType: AnyType
    primitiveType: AnyType
    divAtom: Atom
    textAtom: Atom
  } = {} as any

  beforeEach(() => {
    const ownerId = v4()

    const emptyInterface = new InterfaceType({
      name: 'Empty interface',
      ownerAuthId: '',
      defaults: {},
      ownerId,
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
      api: typeRef(emptyInterface),
      tags: [],
    })

    data.textAtom = new Atom({
      name: 'Text',
      id: v4(),
      type: IAtomType.Text,
      api: typeRef(emptyInterface),
      tags: [],
    })

    data.elementToRender02 = new Element({
      id: v4(),
      name: '02',
      props: new Prop({}),
    })

    const compRootElementId = v4()

    data.componentToRender = new Component({
      id: v4(),
      name: 'My Component',
      rootElementId: compRootElementId,
      ownerId: v4(),
      api: typeRef(emptyInterface),
    })

    data.componentRootElement = new Element({
      id: compRootElementId,
      name: '01',
      customCss: '',
      guiCss: '',
      atom: atomRef(data.textAtom.id),
      parentComponent: componentRef(data.componentToRender),
      props: new Prop({
        id: v4(),
        data: frozen({
          componentProp: 'original',
          [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
        }),
      }),
    })

    data.componentInstanceElementToRender = new Element({
      id: v4(),
      name: '01',
      renderComponentType: componentRef(data.componentToRender),
      props: new Prop({
        id: v4(),
        data: frozen({
          componentProp: 'instance',
        }),
      }),
    })

    data.elementToRender = new Element({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      customCss: '',
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

    data.rootStore = new RenderTestRootStore({
      typeService: new TypeService({
        types: objectMap([
          [data.primitiveType.id, data.primitiveType],
          [data.renderPropsType.id, data.renderPropsType as AnyType],
          [data.reactNodeType.id, data.reactNodeType],
        ]),
      }),
      componentService: new ComponentService({
        components: objectMap([
          [data.componentToRender.id, data.componentToRender],
        ]),
      }),
      atomService: new AtomService({
        _atoms: objectMap([
          [data.divAtom.id, data.divAtom],
          [data.textAtom.id, data.textAtom],
        ]),
      }),
      renderer: new Renderer({
        debugMode: true,
        renderPipe: renderPipeFactory([PassThroughRenderPipe, ...pipes]),
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
      pageElementTree: ElementTree.init(data.componentRootElement, [
        data.componentRootElement,
      ]),
    })

    data.renderer = data.rootStore.renderer

    data.renderer.initForce(data.rootStore.pageElementTree)

    // Renderer isn't attached to rootStore, so has issue accessing context
    elementServiceContext.apply(
      () => data.renderer,
      data.rootStore.elementService,
    )
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}
