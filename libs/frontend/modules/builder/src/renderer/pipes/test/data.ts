import { AtomType, IElement, TypeKind } from '@codelab/shared/abstract/core'

export const elementToRender: IElement = {
  id: '0x2786a',
  name: 'Root element',
  css: '',
  instanceOfComponent: null,
  componentFixedId: null,
  atom: {
    id: '0x27254',
    name: 'Html Div',
    type: AtomType.HtmlDiv,
    api: {
      id: '0x27182',
      name: 'Html Div API',
      typeKind: TypeKind.InterfaceType,
    },
  },
  componentTag: null,
  props: {
    id: '0x27868',
    data: '{"prop01":"prop01Value","prop02":"prop02Value", "prop03":{"typeKind":"PrimitiveType","value": "prop03Value"}}',
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
  renderIfPropKey: null,
  propMapBindings: [
    {
      id: '0x2bf22',
      sourceKey: 'test.source.01',
      targetElementId: null,
      targetKey: 'testTarget01',
    },
    {
      id: '0x2bf23',
      sourceKey: 'test.source.02',
      targetElementId: '0x2786f',
      targetKey: 'testTarget02',
    },
    {
      id: '0x2bf24',
      sourceKey: 'test.source.03',
      targetElementId: '0x2786h',
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
  componentFixedId: null,
  atom: null,
  componentTag: null,
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

export const componentToRender: IElement = {
  id: '0x3a981',
  name: '01',
  css: '',
  instanceOfComponent: null,
  componentFixedId: null,
  atom: {
    id: '0x27150',
    name: 'Text',
    type: AtomType.Text,
    api: {
      id: '0x27145',
      name: 'Text API',
      typeKind: TypeKind.InterfaceType,
    },
  },
  componentTag: {
    id: '0x3a983',
    name: '01',
    isRoot: true,
    children: [],
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
    id: '0x3a981',
  },
  componentFixedId: null,
  atom: null,
  componentTag: null,
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
    componentToRender,
    elementToRender03,
    elementToRender02,
  ],
  edges: [
    {
      order: 0,
      source: elementToRender.id,
      target: elementToRender03.id,
    },
    {
      order: 1,
      source: componentToRender.id,
      target: elementToRender02.id,
    },
  ],
}
