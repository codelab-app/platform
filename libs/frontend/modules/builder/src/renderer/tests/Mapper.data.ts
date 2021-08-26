import { IEdge, IVertex } from '@codelab/frontend/model/domain'
import { Graph } from '@codelab/shared/abstract/core'

export const mapperPageElements = {
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
      css: null,
      id: '0x249f2',
      name: 'Root element',
      props: '{}',
    },
    {
      __typename: 'Element',
      atom: {
        __typename: 'Atom',
        api: {
          __typename: 'InterfaceType',
          id: '0x160fc',
          name: 'Html Div API',
        },
        id: '0x160fb',
        name: 'Html Div',
        type: 'HtmlDiv',
      },
      css: null,
      id: '0x249f3',
      name: 'Div',
      props: '{}',
    },
    {
      __typename: 'Element',
      atom: {
        __typename: 'Atom',
        api: {
          __typename: 'InterfaceType',
          id: '0x16076',
          name: 'Text API',
        },
        id: '0x16075',
        name: 'Text',
        type: 'Text',
      },
      css: null,
      id: '0x249f5',
      name: 'Text',
      props: '{"text":"Card text"}',
    },
  ],
} as Graph<IVertex, IEdge>
