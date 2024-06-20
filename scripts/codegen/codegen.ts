import type { CodegenConfig } from '@graphql-codegen/cli'
import { getEnv } from '../../libs/shared/config/src'

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  hooks: {
    // Uncomment to run ESLint fix after code generation
    afterOneFileWrite: [
      // 'pnpm eslint \
      //   --rule "unused-imports/no-unused-imports-ts: 2" \
      //   --rule "@typescript-eslint/no-explicit-any: 0" \
      //   --rule "@typescript-eslint/member-ordering: 0" \
      //   --rule "prefer-arrow/prefer-arrow-functions: 0" \
      //   --rule "func-style: 0" \
      //   --no-ignore --quiet --fix',
    ],
    afterAllFileWrite: [
      // 'pnpm eslint -c scripts/codegen/.eslintrc.json',
      // 'nx affected --target=lint -c codegen',
      // 'pnpm eslint \
      //   --rule "unused-imports/no-unused-imports-ts: 2" \
      //   --rule "@typescript-eslint/no-explicit-any: 0" \
      //   --rule "@typescript-eslint/member-ordering: 0" \
      //   --rule "prefer-arrow/prefer-arrow-functions: 0" \
      //   --rule "func-style: 0" \
      //   --no-ignore --quiet --fix',
      // 'pnpm prettier --write',
    ],
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
    './libs/frontend/infra/gql/src/': {
      documents: [
        '**/*.tsx',
        '**/*.fragment.ts',
        '**/*.query.ts',
        '**/*.mutation.ts',
      ],
      preset: 'client',
      presetConfig: {
        extension: '.gen.ts',
        fetcher: {
          endpoint: 'http://localhost:4000/graphql',
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
    //     // importOperationTypesFrom:
    //     // Uncomment to force export of fragment types
    //     // importAllFragmentsFrom: '~@codelab/frontend/abstract/core',
    //   },
    //   plugins: ['typescript-graphql-request'],
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
    // './': {
    //   // This somehow generates for web-e2e as well, even if ./libs
    //   documents: ['**/*.{tan,fragment,subscription}.graphql'],
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.graphql.gen.ts',
    //     baseTypesPath: '~@codelab/shared/abstract/codegen',
    //     // importTypesNamespace: 'Operations',
    //     // Uncomment to force export of fragment types
    //     // importAllFragmentsFrom: '~@codelab/frontend/abstract/core',
    //   },
    //   plugins: [
    //     {
    //       add: {
    //         content: "import { fetchParams } from '@codelab/shared/config'",
    //       },
    //     },
    //     // 'typescript-graphql-request',
    //     // 'typescript-operations',
    //     // 'typescript-document-nodes',
    //     '@codelab-app/typescript-react-query',
    //   ],
    //   config: {
    //     /**
    //      * React query, the docs is not up to date, for the most accurate config view the source code
    //      *
    //      * https://github.com/dotansimha/graphql-code-generator-community/blob/main/packages/plugins/typescript/react-query/src/config.ts
    //      */
    //     legacyMode: false,
    //     reactQueryVersion: 5,
    //     addSuspenseQuery: true,
    //     exposeFetcher: true,
    //     exposeDocument: true,
    //     exposeQueryKeys: true,
    //     exposeMutationKeys: true,
    //     /**
    //      * Gql
    //      */
    //     documentMode: 'graphQLTag',
    //     inlineFragmentTypes: 'combine',
    //     gqlImport: 'graphql-tag#gql',
    //     strictScalars: true,
    //     defaultScalarType: 'unknown',
    //     importTypesNamespace: 'Types',
    //     importOperationTypesFrom: 'Types',
    //     fetcher: {
    //       fetchParams: 'fetchParams',
    //       endpoint: getEnv().endpoint.apiGraphqlUrl,
    //     },
    //     dedupeFragments: true,
    //   },
    // },
    // '.': {
    //   documents: ['**/*.{endpoints,fragment,subscription}.graphql'],
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.graphql.gen.ts',
    //     baseTypesPath: '~@codelab/shared/abstract/codegen',
    //   },
    //   plugins: [
    //     // 'typescript-operations',
    //     // 'typescript-document-nodes',
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
