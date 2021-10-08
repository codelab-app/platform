import { AtomType, TypeKind } from '@codelab/shared/abstract/core'

// GetExportAtomsQuery
export const exportAtomsData = [
  {
    name: 'Ant Design Card',
    type: AtomType.AntDesignCard,
    api: {
      name: 'Ant Design Card API',
      typeKind: TypeKind.InterfaceType,
      typeGraph: {
        edges: [
          {
            // source: '0xea82',
            // target: '0xea6d',
            key: 'activeTabKey',
            name: 'Active Tab Key',
            description: "Current TabPane's key",
          },
          {
            // source: '0xea82',
            // target: '0xea66',
            key: 'bordered',
            name: 'Bordered',
            description: 'Toggles rendering of the border around the card',
          },
          {
            // source: '0xea82',
            // target: '0xea6d',
            key: 'defaultActiveTabKey',
            name: 'Default Active Tab Key',
            description:
              "Initial active TabPane's key, if activeTabKey is not set",
          },
          {
            // source: '0xea82',
            // target: '0xea66',
            key: 'hoverable',
            name: 'Hoverable',
            description: 'Lift up when hovering card',
          },
          {
            // source: '0xea82',
            // target: '0xea66',
            key: 'loading',
            name: 'Loading',
            description:
              'Shows a loading indicator while the contents of the card are being fetched',
          },
          {
            // source: '0xea82',
            // target: '0xea6d',
            key: 'type',
            name: 'Type',
            description: 'Card style type, can be set to inner or not set',
          },
        ],
        vertices: [
          {
            name: 'Ant Design Card API',
            typeKind: 'InterfaceType',
          },
          {
            name: 'String',
            typeKind: 'PrimitiveType',
            primitiveKind: 'String',
          },
          {
            name: 'Boolean',
            typeKind: 'PrimitiveType',
            primitiveKind: 'Boolean',
          },
        ],
      },
    },
  },
] as any
