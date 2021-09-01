export const reducerData = {
  type: 'App',
  props: {
    views: 4,
  },
  children: [
    {
      type: 'Graph',
      props: {
        views: 1,
      },
      children: [
        {
          type: 'VertexType',
          props: {
            views: 2,
          },
        },
        {
          type: 'Vertex',
          props: {
            views: 6,
          },
        },
      ],
    },
  ],
}

export const reducerDataCustomChildrenKey: any = {
  type: 'App',
  props: {
    views: 4,
  },
  myChildren: [
    {
      type: 'Graph',
      props: {
        views: 1,
      },
      myChildren: [
        {
          type: 'VertexType',
          props: {
            views: 2,
          },
        },
        {
          type: 'Vertex',
          props: {
            views: 6,
          },
        },
      ],
    },
  ],
}
