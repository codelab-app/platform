import { AtomType, PersistenceType } from '@codelab/shared/abstract/core'
import { CreateElementInput } from '../create-element.input'

export const createElementInput: CreateElementInput = {
  name: 'Example Element',
}

export const createComplexElementInput: CreateElementInput = {
  name: 'Example element',
  hooks: [
    {
      recoilStateHook: {
        stateKey: 'someState',
        defaultValue: "'someValue'",
        persisted: PersistenceType.NotPersisted,
      },
    },
  ],
  renderIfPropKey: 'data',
  css: 'display: block;',
  propMapBindings: [
    {
      targetElementId: '0x1', // this references the refId bellow
      sourceKey: 'data',
      targetKey: 'text',
    },
  ],
  props: '{"data": "Hello!"}',
  children: [
    {
      refId: '0x1',
      name: 'SomeText',
      atom: {
        atomType: AtomType.Text,
      },
    },
    {
      name: 'ComponentElement',
      children: [
        {
          name: 'Some Component',
          isComponent: true,
        },
      ],
    },
  ],
}
