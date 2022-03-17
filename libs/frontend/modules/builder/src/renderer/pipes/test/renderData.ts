import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import {
  AtomType,
  IComponent,
  IElement,
  IType,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'

export const primitiveType: IType = {
  id: '0x092',
  name: 'primitiveType',
  typeKind: TypeKind.PrimitiveType,
  owner: null,
  primitiveKind: PrimitiveTypeKind.Integer,
}

export const elementToRender: IElement = {
  id: '0x2786a',
  name: ROOT_ELEMENT_NAME,
  css: '',
  instanceOfComponent: null,
  component: null,
  atom: {
    id: '0x27254',
    name: 'Html Div',
    type: AtomType.HtmlDiv,
    api: { id: '0x27182' },
  },
  props: {
    id: '0x27868',
    data: `{"prop01":"prop01Value","prop02":"prop02Value", "prop03":{"type":"${primitiveType.id}","value": "prop03Value"}}`,
  },
  hooks: [
    {
      id: '0x2e639',
      type: AtomType.HookRouter,
      config: {
        id: '0x2e63a',
        data: '{"appId":"0x2785e"}',
      },
    },
    {
      id: '0x2e63c',
      type: AtomType.HookQueryPages,
      config: {
        id: '0x2e63b',
        data: '{"appId":"0x2785e"}',
      },
    },
  ],
  renderForEachPropKey: 'renderForEachProp',
  renderIfPropKey: 'shouldRender',
  propMapBindings: [
    {
      id: '0x2bf22',
      sourceKey: 'test.source.01',
      element: { id: '0x2786a' },
      targetElement: null,
      targetKey: 'testTarget01',
    },
    {
      id: '0x2bf23',
      sourceKey: 'test.source.02',
      element: { id: '0x2786a' },
      targetElement: { id: '0x2786f' },
      targetKey: 'testTarget02',
    },
    {
      id: '0x2bf24',
      sourceKey: 'test.source.03',
      element: { id: '0x2786a' },
      targetElement: { id: '0x2786h' },
      targetKey: 'testTarget03',
    },
  ],
  propTransformationJs:
    '// Write a transformer function, you get the input props as parameter\n// All returned props will get merged with the original ones\nfunction transform(props){\n  return Object.keys(props)\n        .map((x)=> ({\n          [`${x}-edited`] : props[x]\n        }))\n        .reduce((total,current) => \n          ({...total,...current}),\n          {}\n        )\n}',
}

export const elementToRender02: IElement = {
  id: '0x3a986',
  name: '02',
  css: null,
  instanceOfComponent: null,
  component: null,
  atom: null,
  props: {
    id: '0x3a987',
    data: '{}',
  },
  hooks: [],
  renderForEachPropKey: null,
  renderIfPropKey: null,
  propMapBindings: [],
  propTransformationJs: null,
}

export const componentToRender: IComponent = {
  id: '0x5bf5f',
  name: 'My Component',
  rootElement: {
    id: '0x3a981',
    name: 'Text',
  },
  owner: {
    auth0Id: '',
    id: '',
  },
}

export const componentRootElement: IElement = {
  id: '0x3a981',
  name: '01',
  css: '',
  component: {
    id: '0x5bf5f',
    name: 'My Component',
  },
  // fixedId: null,
  atom: {
    id: '0x27150',
    name: 'Text',
    type: AtomType.Text,
    api: { id: '0x27145' },
  },
  props: {
    id: '0x3a982',
    data: '{}',
  },
  hooks: [],
  renderForEachPropKey: null,
  renderIfPropKey: null,
  propMapBindings: [],
  propTransformationJs: null,
}

export const elementToRender03: IElement = {
  id: '0x3a985',
  name: '01',
  css: null,
  instanceOfComponent: {
    id: '0x5bf5f',
    name: '01',
  },
  atom: {
    id: '0x27150',
    name: 'Text',
    type: AtomType.Text,
    api: { id: '0x27145' },
  },
  props: {
    id: '0x3a984',
    data: '{}',
  },
  hooks: [],
  renderForEachPropKey: null,
  renderIfPropKey: null,
  propMapBindings: [],
  propTransformationJs: null,
}

export const elementGraph = {
  vertices: [
    elementToRender,
    componentRootElement,
    elementToRender03,
    elementToRender02,
  ],
  edges: [
    {
      order: 0,
      source: elementToRender.id,
      target: elementToRender03.id,
    },
  ],
}

export const treeToRender = new ElementTree(elementGraph)
