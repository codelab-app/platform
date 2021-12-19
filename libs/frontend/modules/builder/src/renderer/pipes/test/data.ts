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
    data: '{}',
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
  renderForEachPropKey: null,
  renderIfPropKey: null,
  propMapBindings: [
    {
      id: '0x2bf22',
      sourceKey: 'routerHook.query.test',
      targetElementId: null,
      targetKey: 'randomProp',
    },
  ],
  propTransformationJs: null,
}
