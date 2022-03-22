import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Component, componentRef } from '@codelab/frontend/modules/component'
import {
  ElementModel,
  ElementProps,
  ElementTree,
} from '@codelab/frontend/modules/element'
import {
  InterfaceType,
  PrimitiveType,
  typeRef,
} from '@codelab/frontend/modules/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import { AtomType } from '@codelab/shared/abstract/core'
import { frozen } from 'mobx-keystone'
import { v4 } from 'uuid'

const emptyInterface = new InterfaceType({ name: 'Empty interface' })

export const primitiveType = new PrimitiveType({
  id: v4(),
  name: 'primitiveType',
  primitiveKind: PrimitiveTypeKind.Integer,
})

export const divAtom = new Atom({
  name: 'Html Div',
  id: v4(),
  type: AtomType.HtmlDiv,
  api: typeRef(emptyInterface),
})

export const textAtom = new Atom({
  name: 'Text',
  id: v4(),
  type: AtomType.Text,
  api: typeRef(emptyInterface),
})

export const elementToRender = new ElementModel({
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  css: '',
  instanceOfComponent: null,
  component: null,
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
  order: 1,
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

export const elementToRender02 = new ElementModel({
  id: v4(),
  name: '02',
  css: null,
  instanceOfComponent: null,
  component: null,
  atom: null,
  props: null,
  order: 2,
})

const compRootElementId = v4()

export const componentToRender = new Component({
  id: v4(),
  name: 'My Component',
  rootElementId: compRootElementId,
  ownerId: v4(),
})

export const componentRootElement = new ElementModel({
  id: compRootElementId,
  name: '01',
  css: '',
  instanceOfComponent: null,
  component: componentRef(componentToRender),
  atom: atomRef(textAtom),
  props: null,
  order: 1,
})

export const elementToRender03 = new ElementModel({
  id: v4(),
  name: '01',
  css: null,
  instanceOfComponent: componentRef(componentToRender),
  atom: atomRef(textAtom),
  props: null,
  order: 1,
})

export const elementTree = new ElementTree({})

elementTree.addElement(elementToRender)
elementTree.addElement(elementToRender02)
elementTree.addElement(componentRootElement)
elementTree.addElement(elementToRender03)
elementTree.addComponent(componentToRender)
