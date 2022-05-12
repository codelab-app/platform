/// <reference types='jest'/>

import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { Atom, atomRef, AtomService } from '@codelab/frontend/modules/atom'
import {
  Component,
  ComponentService,
} from '@codelab/frontend/modules/component'
import {
  Element,
  elementRef,
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
import { componentRef } from '@codelab/frontend/presenter/container'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IAtomType, IRenderPipe } from '@codelab/shared/abstract/core'
import { frozen, objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RenderService } from '../../render.service'
import { PassThroughRenderPipe } from '../../renderPipes/passThroughRenderPipe'
import { renderPipeFactory } from '../../renderPipes/renderPipeFactory'
import { RenderTestRootStore } from './renderTestRootStore'

// Clone everything so that we don't get conflicts between different test files
export const setupTestForRenderer = (
  pipeFactory: (next: PassThroughRenderPipe) => IRenderPipe = renderPipeFactory,
) => {
  const data: {
    rootStore: RenderTestRootStore
    renderService: RenderService
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
    })

    data.componentRootElement = new Element({
      id: compRootElementId,
      name: '01',
      css: '',
      atom: atomRef(data.textAtom),
      component: componentRef(data.componentToRender),
      props: new Prop({
        id: v4(),
        data: frozen({
          componentProp: 'original',
          text: "I'm a component",
        }),
      }),
    })

    data.componentInstanceElementToRender = new Element({
      id: v4(),
      name: '01',
      instanceOfComponent: componentRef(data.componentToRender),
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
      css: '',
      atom: atomRef(data.divAtom),
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
      children: objectMap([
        [data.elementToRender02.id, elementRef(data.elementToRender02)],
        [
          data.componentInstanceElementToRender.id,
          elementRef(data.componentInstanceElementToRender),
        ],
      ]),
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
      renderService: new RenderService({
        debugMode: true,
        renderPipe: pipeFactory(new PassThroughRenderPipe({})),
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
      pageElementTree: new ElementTree({
        _root: elementRef(data.elementToRender),
        componentRoots: objectMap([
          [data.componentRootElement.id, elementRef(data.componentRootElement)],
        ]),
      }),
    })

    // elementServiceContext.apply(
    //   () => data.rootStore.pageElementTree,
    //   getElementService(this),
    // )

    data.renderService = data.rootStore.renderService

    data.renderService.initForce(data.rootStore.pageElementTree)
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}
