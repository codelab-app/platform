import type { Types } from '@graphql-codegen/plugin-helpers'
import { preset } from '@codelab-app/client-preset'
import { deleteSync } from 'del'

const pathToTypescriptFetch =
  '../../node_modules/@codelab-codegen/typescript-fetch'

const config: Types.Config = {
  debug: true,
  verbose: true,
  overwrite: true,
  hooks: {
    // Uncomment to run ESLint fix after code generation
    // afterAllFileWrite: ['pnpm eslint --fix'],
    afterAllFileWrite: [
      'pnpm prettier --write',
      (...files) => {
        const fragmentFiles = files.filter((file) =>
          file.includes('.fragment.graphql.gen.ts'),
        )

        deleteSync(fragmentFiles)
      },
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
    // 'libs/shared/abstract/codegen/src/types.api.graphql.gen.ts': {
    //   documents: ['{apps,libs}/**/*.graphql'],
    //   plugins: ['typescript', 'typescript-operations'],
    //   config: {
    //     inlineFragmentTypes: 'combine',
    //     namingConvention: {
    //       enumValues: 'keep',
    //       // dedupeFragments: true, // Uncomment to deduplicate fragments
    //     },
    //   },
    // },
    /**
     * Instead of `gql` wrapping documents, which requires client side runtime conversion, we build the queries at build time
     */
    'libs/frontend/infra/gql/src/gql/': {
      documents: [
        '**/*.fragment.graphql',
        '**/*.api.graphql',
        // 'libs/frontend/application/**/*.{repository,document}.ts',
        // 'libs/frontend/domain/**/*.{repository,document}.ts',
      ],
      preset,
      config: {
        documentMode: 'string',
        useTypeImports: true,
        enumsAsTypes: true,
      },
      presetConfig: {
        importAllFragmentsFrom: '~@codelab/frontend/infra/gql',
        fragmentMasking: false,
      },
    },
    /**
     * We create our own plugin as a layer on top of client preset, to wrap doucments with `graphql`
     */
    './': {
      documents: ['**/*.{api,fragment}.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        importAllFragmentsFrom: '~@codelab/frontend/infra/gql',
        extension: '.graphql.gen.ts',
        baseTypesPath: '~@codelab/frontend/infra/gql',
      },
      plugins: [pathToTypescriptFetch],
      config: {
        inlineFragmentTypes: 'combine',
        // Uncomment to set suffix for document variables
        // documentVariableSuffix: 'Gql',
        gqlImport: 'graphql-tag#gql',
        strictScalars: true,
        defaultScalarType: 'unknown',
        // dedupeFragments: true, // Uncomment to deduplicate fragments
      },
    },
  },
}

export default config
