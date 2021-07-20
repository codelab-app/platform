import { generate } from '@graphql-codegen/cli'
import { Types } from '@graphql-codegen/plugin-helpers'
import { Injectable } from '@nestjs/common'
import { merge } from 'lodash'
import path from 'path'

interface BaseCodegenConfig {
  watch?: boolean
  schema: Types.Config['schema']
  outputPath: string
}

interface DgraphCodegenConfig extends BaseCodegenConfig {
  outputSchemaPath: string
}

interface ApolloCodegenConfig extends BaseCodegenConfig {
  extension: 'api' | 'd'
}

@Injectable()
export class GraphqlCodegenService {
  public async generateApi({
    schema,
    outputPath,
    watch = false,
  }: BaseCodegenConfig) {
    const config = merge(
      this.baseGraphqlConfig(watch),
      this.apolloGenerateConfig({
        schema,
        outputPath,
        extension: 'api',
      }),
    )

    return await generate(config, true)
  }

  public async generateDgraph({
    schema,
    outputPath,
    outputSchemaPath,
    watch = false,
  }: DgraphCodegenConfig) {
    return await generate(
      merge(
        this.baseGraphqlConfig(watch),
        this.apolloGenerateConfig({
          schema,
          outputPath,
          extension: 'd',
        }),
        this.schemaGenerateConfig({
          outputSchemaPath,
          outputPath,
          schema,
        }),
      ),
      true,
    )
  }

  private apolloGenerateConfig({
    schema,
    outputPath,
    extension,
  }: ApolloCodegenConfig): Types.Config {
    const documents = [
      `libs/modules/**/*.${extension}.graphql`,
      `apps/web/**/*.${extension}.graphql`,
      `apps/web-e2e/**/*.${extension}.graphql`,
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

  private baseGraphqlConfig(watch: boolean): Types.Config {
    return {
      watch,
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

  private schemaGenerateConfig({
    outputSchemaPath,
    schema,
  }: DgraphCodegenConfig): Types.Config {
    return {
      generates: {
        [path.resolve(process.cwd(), outputSchemaPath)]: {
          schema,
          plugins: ['schema-ast'],
        },
      },
    }
  }
}
