import { Types } from '@graphql-codegen/plugin-helpers'
import {
  getPathToTypes,
  graphqlQueryPaths,
  typesOutputPathAbsolute,
} from './generator-settings'

export interface GeneratesInput {
  useCaseDirectory: string
  filenameWithoutExtension: string
  sourceGqlPath: string
}

/**
 * Generated types that is shared & imported by other generated graphql files
 */
export const sharedTypesConfig: Types.Config['generates'] = {
  [`${typesOutputPathAbsolute}.ts`]: {
    plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    documents: graphqlQueryPaths,
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
      ],
      config: [
        {
          importDocumentNodeExternallyFrom: getPathToTypes(sourceGqlPath),
        },
      ],
      // This imports from shared types
      preset: 'import-types',
      presetConfig: {
        typesPath: getPathToTypes(sourceGqlPath),
      },
      documents: sourceGqlPath,
    },
  }
}
