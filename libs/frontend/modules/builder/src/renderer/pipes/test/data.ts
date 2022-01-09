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
