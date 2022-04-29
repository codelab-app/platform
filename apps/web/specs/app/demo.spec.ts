import { createAtomsData } from '../../../../libs/shared/data/src'

describe('demo', () => {
  it('works', () => {
    const received = {
      atoms: [
        {
          id: 'a494a94b-894b-41c5-b10e-a70e102eb9f7',
          name: 'AntDesignGridCol',
          type: 'AntDesignGridCol',
          _api: {
            id: '5d5c69c3-6330-40b4-981c-3c6e88fadf23',
            $modelType: '@codelab/TypeRef',
          },
          tags: [],
          $modelType: '@codelab/Atom',
          api: {
            id: '5d5c69c3-6330-40b4-981c-3c6e88fadf23',
            kind: 'InterfaceType',
            name: 'AntDesignGridCol API',
            ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
            fields: {
              items: {},
              $modelId: 'o-bg-ZbCg-RNNl1atQ0-45J',
              $modelType: 'mobx-keystone/ObjectMap',
            },
            $modelType: '@codelab/InterfaceType',
          },
        },
        {
          id: 'e05db1f0-7532-4678-9f81-b9e54305152d',
          name: 'AntDesignGridRow',
          type: 'AntDesignGridRow',
          _api: {
            id: '61a45ece-8e4b-40c7-bf8b-b42406a95a9d',
            $modelType: '@codelab/TypeRef',
          },
          tags: [],
          $modelType: '@codelab/Atom',
          api: {
            id: '61a45ece-8e4b-40c7-bf8b-b42406a95a9d',
            kind: 'InterfaceType',
            name: 'AntDesignGridRow API',
            ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
            fields: {
              items: {},
              $modelId: 'p-bg-ZbCg-RNNl1atQ0-45J',
              $modelType: 'mobx-keystone/ObjectMap',
            },
            $modelType: '@codelab/InterfaceType',
          },
        },
        {
          id: '8be32322-5527-4a2e-b143-09d493d33193',
          name: 'AntDesignButton',
          type: 'AntDesignButton',
          _api: {
            id: '0fccbbfd-30e1-445f-b897-0c92e2334c9b',
            $modelType: '@codelab/TypeRef',
          },
          tags: [],
          $modelType: '@codelab/Atom',
          api: {
            id: '0fccbbfd-30e1-445f-b897-0c92e2334c9b',
            kind: 'InterfaceType',
            name: 'AntDesignButton API',
            ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
            fields: {
              items: {},
              $modelId: 'q-bg-ZbCg-RNNl1atQ0-45J',
              $modelType: 'mobx-keystone/ObjectMap',
            },
            $modelType: '@codelab/InterfaceType',
          },
        },
        {
          id: 'c6f8ad6b-1fbc-4266-b41b-077e32c147fd',
          name: 'AntDesignTypographyText',
          type: 'AntDesignTypographyText',
          _api: {
            id: '16d50616-f55e-4f0a-b6c3-762747892d60',
            $modelType: '@codelab/TypeRef',
          },
          tags: [],
          $modelType: '@codelab/Atom',
          api: {
            id: '16d50616-f55e-4f0a-b6c3-762747892d60',
            kind: 'InterfaceType',
            name: 'AntDesignTypographyText API',
            ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
            fields: {
              items: {},
              $modelId: 'r-bg-ZbCg-RNNl1atQ0-45J',
              $modelType: 'mobx-keystone/ObjectMap',
            },
            $modelType: '@codelab/InterfaceType',
          },
        },
      ],
      types: [
        {
          id: '5d5c69c3-6330-40b4-981c-3c6e88fadf23',
          kind: 'InterfaceType',
          name: 'AntDesignGridCol API',
          ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
          fields: {
            items: {},
            $modelId: 'o-bg-ZbCg-RNNl1atQ0-45J',
            $modelType: 'mobx-keystone/ObjectMap',
          },
          $modelType: '@codelab/InterfaceType',
        },
        {
          id: '61a45ece-8e4b-40c7-bf8b-b42406a95a9d',
          kind: 'InterfaceType',
          name: 'AntDesignGridRow API',
          ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
          fields: {
            items: {},
            $modelId: 'p-bg-ZbCg-RNNl1atQ0-45J',
            $modelType: 'mobx-keystone/ObjectMap',
          },
          $modelType: '@codelab/InterfaceType',
        },
        {
          id: '0fccbbfd-30e1-445f-b897-0c92e2334c9b',
          kind: 'InterfaceType',
          name: 'AntDesignButton API',
          ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
          fields: {
            items: {},
            $modelId: 'q-bg-ZbCg-RNNl1atQ0-45J',
            $modelType: 'mobx-keystone/ObjectMap',
          },
          $modelType: '@codelab/InterfaceType',
        },
        {
          id: '16d50616-f55e-4f0a-b6c3-762747892d60',
          kind: 'InterfaceType',
          name: 'AntDesignTypographyText API',
          ownerId: '789e5e13-17ab-4992-92d2-643198e74c76',
          fields: {
            items: {},
            $modelId: 'r-bg-ZbCg-RNNl1atQ0-45J',
            $modelType: 'mobx-keystone/ObjectMap',
          },
          $modelType: '@codelab/InterfaceType',
        },
      ],
    }

    expect(received).toMatchObject({
      // Use arrayContaining so order doesn't matter
      atoms: expect.arrayContaining(
        createAtomsData.map((atom) =>
          expect.objectContaining({
            name: atom.name,
            type: atom.type,
            // This is required for nested
            api: expect.objectContaining({
              name: `${atom.name} API`,
            }),
          }),
        ),
      ),
    })
  })
})
