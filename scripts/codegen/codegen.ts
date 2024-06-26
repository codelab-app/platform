import { Types } from '@graphql-codegen/plugin-helpers'

const config: Types.Config = {
  overwrite: true,
  hooks: {
    // Uncomment to run ESLint fix after code generation
    // afterAllFileWrite: ['pnpm eslint --fix'],
    afterAllFileWrite: ['pnpm prettier --write'],
  },
  // Uncomment for using a local schema file
  // schema: 'schema.graphql',
  schema: 'http://127.0.0.1:4000/api/graphql',
  config: {
    scalars: {
      // Uncomment to override scalar types
      // uuid: 'string',
      JSON: 'Record<string, any>',
      JSONObject: 'Record<string, any>',
      DateTime: 'string',
      Int64: 'number',
      _Any: 'any',
      Void: 'void',
    },
    skipTypename: true,
    nonOptionalTypename: false,
  },
  generates: {
    'schema.graphql': {
      plugins: ['schema-ast'],
    },
    'libs/shared/abstract/codegen/src/types.api.graphql.gen.ts': {
      documents: ['{apps,libs}/**/*.graphql'],
      plugins: ['typescript', 'typescript-operations'],
      config: {
        inlineFragmentTypes: 'combine',
        namingConvention: {
          enumValues: 'keep',
          // dedupeFragments: true, // Uncomment to deduplicate fragments
        },
      },
    },
    // '.': {
    //   // This somehow generates for web-e2e as well, even if ./libs
    //   documents: ['**/*.{endpoints,fragment,subscription}.graphql'],
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.graphql.gen.ts',
    //     baseTypesPath: '~@codelab/shared/abstract/codegen',
    //     // Uncomment to force export of fragment types
    //     // importAllFragmentsFrom: '~@codelab/frontend/abstract/core',
    //   },
    //   plugins: ['typescript-operations', 'typescript-graphql-request'],
    //   config: {
    //     inlineFragmentTypes: 'combine',
    //     // Uncomment to set suffix for document variables
    //     // documentVariableSuffix: 'Gql',
    //     gqlImport: 'graphql-tag#gql',
    //     strictScalars: true,
    //     defaultScalarType: 'unknown',
    //     // dedupeFragments: true, // Uncomment to deduplicate fragments
    //   },
    // },
    'libs/frontend/infra/gql/src/graphql/': {
      documents: ['**/*.fragment.graphql', '**/*.action.ts'],
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    // 'libs/**': {
    //   // This somehow generates for web-e2e as well, even if ./libs
    //   documents: ['**/*.spec.graphql'],
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.graphql.gen.ts',
    //     baseTypesPath: '~@codelab/shared/abstract/codegen',
    //     // Uncomment to force export of fragment types
    //     // importAllFragmentsFrom: '~@codelab/frontend/abstract/core',
    //   },
    //   plugins: ['typescript-document-nodes'],
    //   config: {
    //     inlineFragmentTypes: 'combine',
    //     // Uncomment to set suffix for document variables
    //     // documentVariableSuffix: 'Gql',
    //     gqlImport: 'graphql-tag#gql',
    //     strictScalars: true,
    //     defaultScalarType: 'unknown',
    //     // dedupeFragments: true, // Uncomment to deduplicate fragments
    //   },
    // },
  },
}

export default config
