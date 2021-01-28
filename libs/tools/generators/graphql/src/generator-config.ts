import { Types } from '@graphql-codegen/plugin-helpers'
import {
  fragmentQueryPaths,
  fragmentsOutputPathAbsolute,
  getPathToTypes,
  graphqlQueryPaths,
  typesOutputPathAbsolute,
} from './generator-settings'

export interface GeneratesInput {
  useCaseDirectory: string
  filenameWithoutExtension: string
  sourceGqlPath: string
}

export const sharedConfigs: Types.Config['generates'] = {
  /**
   * Generated types that is shared & imported by other generated graphql files
   */
  [`${typesOutputPathAbsolute}.ts`]: {
    plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    documents: graphqlQueryPaths,
  },
  /**
   * Colocate all fragments together, so we can import into other files
   */
  [`${fragmentsOutputPathAbsolute}.ts`]: {
    plugins: ['typescript-document-nodes'],
    documents: fragmentQueryPaths,
  },
  'schema.graphql': {
    plugins: ['schema-ast'],
    hooks: {
      afterAllFileWrite: 'prettier --write',
    },
  },
}

/**
 * Create the `generates` section of graphql config, this way we use 1 generator instead of 1 generator per input file
 */
export const makeGeneratesConfig = ({
  useCaseDirectory,
  filenameWithoutExtension,
  sourceGqlPath,
}: GeneratesInput): Types.Config['generates'] => {
  return {
    [`${useCaseDirectory}/${filenameWithoutExtension}.generated.ts`]: {
      plugins: [
        {
          'typescript-react-apollo': {
            reactApolloVersion: 3,
            withHook: true,
            documentVariableSuffix: 'Gql',
          },
        },
        'typescript-operations',
      ],
      config: [
        {
          importDocumentNodeExternallyFrom: getPathToTypes(sourceGqlPath),
        },
      ],
      // preset: 'near-operation-file',
      // presetConfig: {
      //   baseTypesPath: typesOutputPathAbsolute,
      //   importAllFragmentsFrom: fragmentsOutputPathAbsolute,
      // },
      // // This imports from shared types
      // preset: 'import-types',
      // presetConfig: {
      //   typesPath: getPathToTypes(sourceGqlPath),
      // },
      documents: [sourceGqlPath],
    },
  }
}
