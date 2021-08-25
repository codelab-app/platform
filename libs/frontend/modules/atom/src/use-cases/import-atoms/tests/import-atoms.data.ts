const atoms = [
  {
    id: '0xea81',
    name: 'Ant Design Card',
    type: 'AntDesignCard',
    api: {
      id: '0xea82',
      name: 'Ant Design Card API',
      typeKind: 'InterfaceType',
      typeGraph: {
        edges: [
          {
            source: '0xea82',
            target: '0xea6d',
            kind: 'Field',
            field: {
              id: '0xec17',
              key: 'activeTabKey',
              name: 'Active Tab Key',
              description: "Current TabPane's key",
              __typename: 'Field',
            },
            __typename: 'TypeEdge',
          },
          {
            source: '0xea82',
            target: '0xea66',
            kind: 'Field',
            field: {
              id: '0xec65',
              key: 'bordered',
              name: 'Bordered',
              description: 'Toggles rendering of the border around the card',
              __typename: 'Field',
            },
            __typename: 'TypeEdge',
          },
          {
            source: '0xea82',
            target: '0xea6d',
            kind: 'Field',
            field: {
              id: '0xec9a',
              key: 'defaultActiveTabKey',
              name: 'Default Active Tab Key',
              description:
                "Initial active TabPane's key, if activeTabKey is not set",
              __typename: 'Field',
            },
            __typename: 'TypeEdge',
          },
          {
            source: '0xea82',
            target: '0xea66',
            kind: 'Field',
            field: {
              id: '0xecbb',
              key: 'hoverable',
              name: 'Hoverable',
              description: 'Lift up when hovering card',
              __typename: 'Field',
            },
            __typename: 'TypeEdge',
          },
          {
            source: '0xea82',
            target: '0xea66',
            kind: 'Field',
            field: {
              id: '0xecd5',
              key: 'loading',
              name: 'Loading',
              description:
                'Shows a loading indicator while the contents of the card are being fetched',
              __typename: 'Field',
            },
            __typename: 'TypeEdge',
          },
          {
            source: '0xea82',
            target: '0xea6d',
            kind: 'Field',
            field: {
              id: '0xecf1',
              key: 'type',
              name: 'Type',
              description: 'Card style type, can be set to inner or not set',
              __typename: 'Field',
            },
            __typename: 'TypeEdge',
          },
        ],
        vertices: [
          {
            __typename: 'InterfaceType',
            id: '0xea82',
            name: 'Ant Design Card API',
            typeKind: 'InterfaceType',
          },
          {
            __typename: 'PrimitiveType',
            id: '0xea6d',
            name: 'String',
            typeKind: 'PrimitiveType',
            primitiveKind: 'String',
          },
          {
            __typename: 'PrimitiveType',
            id: '0xea66',
            name: 'Boolean',
            typeKind: 'PrimitiveType',
            primitiveKind: 'Boolean',
          },
        ],
        __typename: 'TypeGraph',
      },
      __typename: 'InterfaceType',
    },
    __typename: 'Atom',
  },
]
