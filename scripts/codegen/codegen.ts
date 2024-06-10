import type { CodegenConfig } from '@graphql-codegen/cli'
import { getEnv } from '../../libs/shared/config/src'

const config: CodegenConfig = {
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
    './': {
      // This somehow generates for web-e2e as well, even if ./libs
      documents: ['**/*.{tan,fragment,subscription}.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.graphql.gen.ts',
        baseTypesPath: '~@codelab/shared/abstract/codegen',
        // Uncomment to force export of fragment types
        // importAllFragmentsFrom: '~@codelab/frontend/abstract/core',
      },
      plugins: [
        {
          add: {
            content: "import { fetchParams } from '@codelab/shared/config'",
          },
        },
        'typescript-react-query',
        'typescript-operations',
        // 'typescript-document-nodes',
        'typescript-graphql-request',
      ],
      config: {
        /**
         * React query, the docs is not up to date, for the most accurate config view the source code
         *
         * https://github.com/dotansimha/graphql-code-generator-community/blob/main/packages/plugins/typescript/react-query/src/config.ts
         */
        legacyMode: false,
        reactQueryVersion: 5,
        addSuspenseQuery: true,
        exposeFetcher: true,
        exposeDocument: true,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        /**
         * Gql
         */
        // documentMode: 'external',
        // importDocumentNodeExternallyFrom: 'near-operation-file',
        inlineFragmentTypes: 'combine',
        gqlImport: 'graphql-tag#gql',
        strictScalars: true,
        defaultScalarType: 'unknown',
        fetcher: {
          fetchParams: 'fetchParams',
          endpoint: getEnv().endpoint.apiGraphqlUrl,
        },
        dedupeFragments: true,
      },
    },
    // '.': {
    //   documents: ['**/*.{endpoints,fragment,subscription}.graphql'],
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.graphql.gen.ts',
    //     baseTypesPath: '~@codelab/shared/abstract/codegen',
    //   },
    //   plugins: [
    //     'typescript-operations',
    //     'typescript-document-nodes',
    //     'typescript-graphql-request',
    //   ],
    //   config: {
    //     inlineFragmentTypes: 'combine',
    //     gqlImport: 'graphql-tag#gql',
    //     strictScalars: true,
    //     defaultScalarType: 'unknown',
    //   },
    // },
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
    //     gqlImport: 'graphql-tag#gql',
    //     strictScalars: true,
    //     defaultScalarType: 'unknown',
    //     // dedupeFragments: true, // Uncomment to deduplicate fragments
    //   },
    // },
  },
}

export default config
