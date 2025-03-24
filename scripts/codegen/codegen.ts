import type { Types } from '@graphql-codegen/plugin-helpers'
import { deleteSync } from 'del'
import { preset } from '@codelab-codegen/codelab-preset'

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
      //  'pnpm prettier --write',
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
      // Add step to replace toString(): string with override toString(): string in graphql.ts
      (...files) => {
        files.forEach((file) => {
          if (file.endsWith('graphql.ts')) {
            const fs = require('fs')
            const content = fs.readFileSync(file, 'utf8')
            const updated = content.replace(
              /toString\(\): string/g,
              'override toString(): string',
            )
            fs.writeFileSync(file, updated)
          }
        })
      },
    ],
  },
  // Uncomment for using a local schema file
  schema: 'schema.graphql',
  // schema: getEnv().endpoint.apiGraphqlUrl,
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
    'libs/shared/infra/gqlgen/src/gql/': {
      documents: ['**/*.fragment.graphql', '**/*.api.graphql'],
      preset,
    },
    /**
     * We create our own plugin as a layer on top of client preset, to wrap documents with `graphql`
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
        baseTypesPath: '~@codelab/shared/infra/gqlgen',
        extension: '.graphql.web.gen.ts',
      },
      plugins: [
        {
          ['@codelab-codegen/typescript-server-fetch']: {
            gqlFn: 'gqlServerRequest',
            gqlFnPath: '@codelab/shared/infra/fetch-server',
            graphqlPath: '@codelab/shared/infra/gqlgen',
          },
        },
      ],
    },
    './libs/shared': {
      documents: [
        'libs/frontend/**/*.{api,fragment}.graphql',
        'libs/shared/domain/module/**/*.{api,fragment}.graphql',
      ],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '~@codelab/shared/infra/gqlgen',
        extension: '.graphql.api.gen.ts',
      },
      plugins: [
        {
          // this path points to a node_module package, make sure to run `pnpm install` before `pnpm codegen`
          ['@codelab-codegen/typescript-fetch']: {
            gqlFn: 'gqlRequest',
            gqlFnPath: '@codelab/shared/infra/fetch',
            graphqlPath: '@codelab/shared/infra/gqlgen',
          },
        },
      ],
    },
    './libs': {
      documents: ['libs/**/*.{subscription,spec,client}.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.graphql.gen.ts',
        baseTypesPath: '~@codelab/shared/infra/gqlgen',
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
