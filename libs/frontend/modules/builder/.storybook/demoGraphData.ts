import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'

/**
 * We first build a page using the web builder, then we copy the data for the renderer.
 */
export const demoGraphData = {
  __typename: 'ElementGraph',
  edges: [
    {
      order: 1,
      source: '0x249f2',
      target: '0x249f3',
    },
    {
      order: 1,
      source: '0x249f3',
      target: '0x249f5',
    },
  ],
  vertices: [
    {
      __typename: 'Element',
      atom: null,
      customCss: null,
      guiCss: null,
      id: '0x249f2',
      name: ROOT_ELEMENT_NAME,
      props: '{}',
      hooks: [],
      propMapBindings: [],
    },
    {
      __typename: 'Element',
      atom: {
        __typename: 'Atom',
        id: '0x160fb',
        name: 'Button',
        type: 'AntDesignButton',
        api: {
          __typename: 'InterfaceType',
          id: '0x160fc',
          name: 'Button API',
        },
      },
      customCss: null,
      guiCss: null,
      id: '0x249f3',
      name: 'Button',
      props: '{ "type": "primary" }',
      hooks: [],
      propMapBindings: [],
    },
    {
      __typename: 'Element',
      atom: {
        __typename: 'Atom',
        id: '0x16075',
        name: 'Text',
        type: 'Text',
        api: {
          __typename: 'InterfaceType',
          id: '0x16076',
          name: 'Button API',
        },
      },
      customCss: null,
      guiCss: null,
      id: '0x249f5',
      name: 'Text',
      props: '{ "text": "Click Me!" }',
      hooks: [],
      propMapBindings: [],
    },
  ],
} as any
