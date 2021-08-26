import { IEdge, IVertex } from '@codelab/frontend/model/domain'
import { Graph } from '@codelab/shared/abstract/core'

export const mapperPageElements = {
  __typename: 'ElementGraph',
  edges: [
    {
      order: 1,
      source: '0x186af',
      target: '0x186b0',
    },
    {
      order: 2,
      source: '0x186b0',
      target: '0x186b1',
    },
  ],
  vertices: [
    {
      __typename: 'Element',
      atom: null,
      css: null,
      id: '0x186af',
      name: 'Root element',
      props: '{}',
    },
    {
      __typename: 'Element',
      atom: {
        __typename: 'Atom',
        api: {
          __typename: 'InterfaceType',
          id: '0x160b8',
          name: 'Ant Design Menu API',
        },
        id: '0x160b7',
        label: '',
        name: 'Ant Design Menu',
        type: 'AntDesignMenu',
      },
      css: null,
      id: '0x186b0',
      name: 'Menu',
      props: '{"subMenuCloseDelay":10,"subMenuOpenDelay":10,"mode":""}',
    },
    {
      __typename: 'Element',
      atom: {
        __typename: 'Atom',
        api: {
          __typename: 'InterfaceType',
          id: '0x186ac',
          name: 'MenuItem API',
        },
        id: '0x186ab',
        label: '',
        name: 'MenuItem',
        type: 'AntDesignMenuItem',
      },
      css: null,
      id: '0x186b1',
      name: 'menuitem',
      props: '{"children":"Hello"}',
    },
  ],
} as Graph<IVertex, IEdge>
