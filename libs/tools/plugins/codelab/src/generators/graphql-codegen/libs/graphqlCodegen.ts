import { CodegenContext, generate } from '@graphql-codegen/cli'
import { Types } from '@graphql-codegen/plugin-helpers'
import { merge } from 'lodash'
import path from 'path'
import { NormalizedSchema } from '../generator'

interface BaseCodegenConfig {
  schema: string
  outputPath: string
}

interface ApolloCodegenConfig extends BaseCodegenConfig {
  extension: 'api' | 'd'
}

const apolloGenerateConfig = ({
  schema,
  outputPath,
  extension,
}: ApolloCodegenConfig): Types.Config => {
  const documents = [
    `libs/modules/**/*.${extension}.graphql`,
    `apps/web/**/*.${extension}.graphql`,
  ]

  return {
    generates: {
      [path.resolve(process.cwd(), outputPath)]: {
        schema,
        documents,
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-react-apollo',
          'typescript-document-nodes',
        ],
        config: {
          documentVariableSuffix: 'Gql',
          gqlImport: '@apollo/client#gql',
          skipTypename: true,
          strictScalars: true,
          defaultScalarType: 'unknown',
          withRefetchFn: true,
          scalars: {
            uuid: 'string',
            json: 'Record<string, any>',
            jsonb: 'Record<string, any>',
            DateTime: 'string',
            Int64: 'number',
            _Any: 'any',
          },
        },
      },
    },
  }
}

const schemaGenerateConfig = ({
  schema,
  outputPath,
}: BaseCodegenConfig): Types.Config => {
  return {
    generates: {
      [path.resolve(process.cwd(), outputPath)]: {
        schema,
        plugins: ['schema-ast'],
      },
    },
  }
}

const baseGraphqlConfig = (): Types.Config => {
  return {
    overwrite: true,
    hooks: {
      afterAllFileWrite: [
        'yarn prettier --write',
        'yarn eslint --ext ts --fix',
      ],
    },
    generates: {},
  }
}

export const generateApi = async (options: NormalizedSchema) => {
  const { codelabApiGraphqlEndpoint } = options

  return await generate(
    merge(
      baseGraphqlConfig(),
      apolloGenerateConfig({
        schema: codelabApiGraphqlEndpoint,
        outputPath: 'libs/graphql/src/graphql-client-api.generated.ts',
        extension: 'api',
      }),
    ),
    true,
  )
}

export const generateDgraph = async (options: NormalizedSchema) => {
  const { CODELAB_DGRAPH_GRAPHQL_ENDPOINT } = options

  return await generate(
    merge(
      baseGraphqlConfig(),
      apolloGenerateConfig({
        schema: CODELAB_DGRAPH_GRAPHQL_ENDPOINT,
        outputPath: 'libs/dgraph/src/graphql-client-dgraph.generated.ts',
        extension: 'd',
      }),
      schemaGenerateConfig({
        schema: CODELAB_DGRAPH_GRAPHQL_ENDPOINT,
        outputPath: 'schema.dgraph.graphql',
      }),
    ),
    true,
  )
}
