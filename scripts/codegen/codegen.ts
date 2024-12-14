import type { Types } from '@graphql-codegen/plugin-helpers'
import { preset } from '@codelab-app/client-preset'
import { deleteSync } from 'del'
import { getEnv } from '../../libs/shared/config/env/src'

const pathToTypescriptServerFetch =
  '../../node_modules/@codelab-codegen/typescript-server-fetch'

const pathToTypescriptFetch =
  '../../node_modules/@codelab-codegen/typescript-fetch'

const pathToClientPresetDocuments =
  '../../node_modules/@codelab-codegen/client-preset-documents'

/**
 * `Field args marked as @deprecated are lost when getting schema over HTTP`
 *
 * https://github.com/dotansimha/graphql-code-generator/issues/9659
 */

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
        /**
         * Can't remove these from codegen when using custom plugin, so we remove them here
         */
        const extensionsToDelete = [
          // Created from codegen for web
          '.fragment.graphql.web.gen.ts',
          '.fragment.graphql.docs.gen.ts',
          // Created from codegen for api
          '.fragment.graphql.api.gen.ts',
          '.fragment.graphql.docs.api.gen.ts',
        ]
        const fragmentFiles = files.filter((file) =>
          extensionsToDelete.some((ext) => file.includes(ext)),
        )

        deleteSync(fragmentFiles)
      },
    ],
  },
  // Uncomment for using a local schema file
  // schema: 'schema.graphql',
  schema: getEnv().endpoint.apiGraphqlUrl,
  config: {
    inputValueDeprecation: true,
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
    /**
     * Instead of `gql` wrapping documents, which requires client side runtime conversion, we build the queries at build time
     */
    'libs/shared/infra/gql/src/gql/': {
      documents: [
        '**/*.fragment.graphql',
        '**/*.subscription.graphql',
        '**/*.api.graphql',
        // 'libs/frontend/application/**/*.{repository,document}.ts',
        // 'libs/frontend/domain/**/*.{repository,document}.ts',
      ],
      preset,
      config: {
        documentMode: 'string',
        inlineFragmentTypes: 'combine',
        // useTypeImports: true,
        // enumsAsTypes: true,
      },
      presetConfig: {
        importAllFragmentsFrom: '~@codelab/shared/infra/gql',
        fragmentMasking: false,
      },
    },
    /**
     * We create our own plugin as a layer on top of client preset, to wrap doucments with `graphql`
     *
     * We want to keep the client preset documents in a file, and the operations in another file.
     *
     * Moving these files to shared means the server action portion can't be imported by backend, only the frontend.
     *
     * Which is why we need to split the portions into separate files, then create separate import entries
     *
     * The `presetConfig` seems to only work at top level, can't use under each plugin, so we split into 2 separate top level configs.
     *
     * Although we can't use the same key for json config, we can use `./` and `.` to differentiate the 2
     */
    './': {
      documents: [
        'libs/frontend/**/*.{api,fragment}.graphql',
        'libs/shared/domain/module/**/*.{api,fragment}.graphql',
      ],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '~@codelab/shared/infra/gql',
        importAllFragmentsFrom: '~@codelab/shared/infra/gql',
        extension: '.graphql.web.gen.ts',
      },
      plugins: [
        {
          [pathToTypescriptServerFetch]: {
            /**
             * PresetConfig doesn't seem to work here
             */
            // presetConfig: {
            //   baseTypesPath: '~@codelab/shared/infra/gql',
            //   importAllFragmentsFrom: '~@codelab/shared/infra/gql',
            //   extension: '.gen.ts',
            // },
          },
        },
      ],
      config: {
        inlineFragmentTypes: 'combine',
        // Need to so we don't import fragments
        importOperationTypesFrom: '',
        importAllFragmentsFrom: '',
        // Uncomment to set suffix for document variables
        // documentVariableSuffix: 'Gql',
        // gqlImport: 'graphql-tag#gql',
        strictScalars: true,
        defaultScalarType: 'unknown',
        // dedupeFragments: true, // Uncomment to deduplicate fragments
      },
    },
    './libs/shared': {
      documents: [
        'libs/frontend/**/*.{api,fragment}.graphql',
        'libs/shared/domain/module/**/*.{api,fragment}.graphql',
      ],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '~@codelab/shared/infra/gql',
        importAllFragmentsFrom: '~@codelab/shared/infra/gql',
        extension: '.graphql.api.gen.ts',
      },
      plugins: [
        {
          [pathToTypescriptFetch]: {},
        },
      ],
      config: {
        inlineFragmentTypes: 'combine',
        // Need to so we don't import fragments
        importOperationTypesFrom: '',
        importAllFragmentsFrom: '',
        // Uncomment to set suffix for document variables
        // documentVariableSuffix: 'Gql',
        // gqlImport: 'graphql-tag#gql',
        strictScalars: true,
        defaultScalarType: 'unknown',
        // dedupeFragments: true, // Uncomment to deduplicate fragments
      },
    },
    '.': {
      documents: [
        'libs/frontend/**/*.{api,fragment}.graphql',
        'libs/shared/domain/**/*.{api,fragment}.graphql',
      ],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '~@codelab/shared/infra/gql',
        importAllFragmentsFrom: '~@codelab/shared/infra/gql',
        extension: '.graphql.docs.gen.ts',
      },
      plugins: [
        {
          [pathToClientPresetDocuments]: {},
        },
      ],
      config: {
        inlineFragmentTypes: 'combine',
        importOperationTypesFrom: '',
        importAllFragmentsFrom: '',
        // Uncomment to set suffix for document variables
        // documentVariableSuffix: 'Gql',
        // gqlImport: 'graphql-tag#gql',
        strictScalars: true,
        defaultScalarType: 'unknown',
        // dedupeFragments: true, // Uncomment to deduplicate fragments
      },
    },
    './libs/backend': {
      documents: ['libs/backend/**/*.{subscription,spec}.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.graphql.api.gen.ts',
        baseTypesPath: '~@codelab/shared/infra/gql',
        // Uncomment to force export of fragment types
        // importAllFragmentsFrom: '~@codelab/frontend/abstract/core',
      },
      plugins: ['typescript-operations', 'typescript-graphql-request'],
      config: {
        inlineFragmentTypes: 'combine',
        // Uncomment to set suffix for document variables
        // documentVariableSuffix: 'Gql',
        gqlImport: 'graphql-tag#gql',
        strictScalars: true,
        defaultScalarType: 'unknown',
        // dedupeFragments: true, // Uncomment to deduplicate fragments
        inputValueDeprecation: true,
      },
    },
  },
}

export default config
