export const mapData = {
  type: 'App',
  props: {
    name: 'App',
  },
  children: [
    {
      type: 'Graph',
      props: {
        name: 'Graph',
      },
      children: [
        {
          type: 'VertexType',
          props: {
            name: 'VertexType',
          },
        },
        {
          type: 'Vertex',
          props: {
            name: 'Vertex',
          },
        },
      ],
    },
  ],
}

export const mapDataLowerProps = {
  type: 'App',
  props: {
    name: 'app',
  },
  children: [
    {
      type: 'Graph',
      props: {
        name: 'graph',
      },
      children: [
        {
          type: 'VertexType',
          props: {
            name: 'vertexType',
          },
        },
        {
          type: 'Vertex',
          props: {
            name: 'vertex',
          },
        },
      ],
    },
  ],
}

export const mapDataCustomChildrenKey = {
  type: 'App',
  props: {
    name: 'app',
  },
  myChildren: [
    {
      type: 'Graph',
      props: {
        name: 'graph',
      },
      myChildren: [
        {
          type: 'VertexType',
          props: {
            name: 'vertexType',
          },
        },
        {
          type: 'Vertex',
          props: {
            name: 'vertex',
          },
        },
      ],
    },
  ],
}
