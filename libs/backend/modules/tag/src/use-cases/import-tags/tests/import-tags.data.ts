export const tagGraphsData = [
  {
    __typename: 'TagGraph',
    edges: [
      { __typename: 'TagEdge', source: '0x22339', target: '0x2233a' },
      { __typename: 'TagEdge', source: '0x22339', target: '0x22619' },
    ],
    vertices: [
      {
        __typename: 'Tag',
        id: '0x22339',
        name: 'UI Frameworks',
        isRoot: true,
      },
      {
        __typename: 'Tag',
        id: '0x2233a',
        name: 'Ant Design',
        isRoot: false,
      },
      {
        __typename: 'Tag',
        id: '0x22619',
        name: 'Material UI',
        isRoot: false,
      },
    ],
  },
]
