/// <reference types='jest'/>

import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { Atom, atomRef, AtomService } from '@codelab/frontend/modules/atom'
import { Component, componentRef } from '@codelab/frontend/modules/component'
import {
  Element,
  ElementProps,
  ElementService,
  ElementTree,
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
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import { AtomType } from '@codelab/shared/abstract/core'
import { clone, frozen, objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { IRenderPipe } from '../../abstract/IRenderPipe'
import { PassThroughRenderPipe } from '../../renderPipes/PassThroughRenderPipe'
import { rootRenderPipeFactory } from '../../renderPipes/rootRenderPipeFactory'
import { RenderService } from '../../RenderService'
import { RenderTestRootStore } from './RenderTestRootStore'

const emptyInterface = new InterfaceType({ name: 'Empty interface' })

const primitiveType = new PrimitiveType({
  id: v4(),
  name: 'primitiveType',
  primitiveKind: PrimitiveTypeKind.Integer,
})

const renderPropsType = new RenderPropsType({
  id: v4(),
  name: 'renderPropsType',
})

const reactNodeType = new ReactNodeType({
  id: v4(),
  name: 'reactNodeType',
})

const divAtom = new Atom({
  name: 'Html Div',
  id: v4(),
  type: AtomType.HtmlDiv,
  api: typeRef(emptyInterface),
})

const textAtom = new Atom({
  name: 'Text',
  id: v4(),
  type: AtomType.Text,
  api: typeRef(emptyInterface),
})

const elementToRender = new Element({
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  css: '',
  atom: atomRef(divAtom),
  props: new ElementProps({
    id: v4(),
    data: frozen({
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: {
        type: primitiveType.id,
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

const elementToRender02 = new Element({
  id: v4(),
  name: '02',
  props: new ElementProps({}),
})

const compRootElementId = v4()

const componentToRender = new Component({
  id: v4(),
  name: 'My Component',
  rootElementId: compRootElementId,
  ownerId: v4(),
})

const componentRootElement = new Element({
  id: compRootElementId,
  name: '01',
  css: '',
  atom: atomRef(textAtom),
  component: componentRef(componentToRender),
  props: new ElementProps({
    id: v4(),
    data: frozen({
      componentProp: 'original',
      text: "I'm a component",
    }),
  }),
})

const componentInstanceElementToRender = new Element({
  id: v4(),
  name: '01',
  instanceOfComponent: componentRef(componentToRender),
  props: new ElementProps({
    id: v4(),
    data: frozen({
      componentProp: 'instance',
    }),
  }),
})

// Clone everything so that we don't get conflicts between different test files
export const setupTestRenderData = (
  pipeFactory: (
    next: PassThroughRenderPipe,
  ) => IRenderPipe = rootRenderPipeFactory,
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
    data.componentToRender = clone(componentToRender, { generateNewIds: false })
    data.componentRootElement = clone(componentRootElement, {
      generateNewIds: false,
    })
    data.elementToRender = clone(elementToRender, {
      generateNewIds: false,
    })
    data.elementToRender02 = clone(elementToRender02, {
      generateNewIds: false,
    })

    data.componentInstanceElementToRender = clone(
      componentInstanceElementToRender,
      { generateNewIds: false },
    )

    data.renderPropsType = clone(renderPropsType, { generateNewIds: false })
    data.reactNodeType = clone(reactNodeType, { generateNewIds: false })
    data.primitiveType = clone(primitiveType, { generateNewIds: false })
    data.divAtom = clone(divAtom, { generateNewIds: false })
    data.textAtom = clone(textAtom, { generateNewIds: false })

    data.rootStore = new RenderTestRootStore({
      typeService: new TypeService({
        types: objectMap([
          [primitiveType.id, data.primitiveType],
          [renderPropsType.id, data.renderPropsType as AnyType],
          [reactNodeType.id, data.reactNodeType as AnyType],
        ]),
      }),
      atomService: new AtomService({
        atoms: objectMap([
          [divAtom.id, data.divAtom],
          [textAtom.id, data.textAtom],
        ]),
      }),
      renderService: new RenderService({
        debugMode: true,
        renderPipe: pipeFactory(new PassThroughRenderPipe({})),
      }),
      elementService: new ElementService({
        elementTree: new ElementTree({
          components: objectMap([
            [componentToRender.id, data.componentToRender],
          ]),
          elements: objectMap([
            [elementToRender.id, data.elementToRender],
            [componentRootElement.id, data.componentRootElement],
            [
              componentInstanceElementToRender.id,
              data.componentInstanceElementToRender,
            ],
            [elementToRender02.id, data.elementToRender02],
          ]),
        }),
      }),
    })

    data.renderService = data.rootStore.renderService
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}
