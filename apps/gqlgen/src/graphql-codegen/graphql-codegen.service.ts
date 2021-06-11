import { cLog } from '@codelab/backend'
import { CodegenContext, generate } from '@graphql-codegen/cli'
import { Types } from '@graphql-codegen/plugin-helpers'
import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { merge, mergeWith } from 'lodash'
import path from 'path'

interface BaseCodegenConfig {
  watch?: boolean
  schema: string
  outputPath: string
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
    return await generate(
      merge(
        this.baseGraphqlConfig(watch),
        this.apolloGenerateConfig({
          schema,
          outputPath,
          extension: 'api',
        }),
      ),
      true,
    )
  }

  public async generateDgraph({
    schema,
    outputPath,
    watch = false,
  }: BaseCodegenConfig) {
    cLog(
      merge(
        this.baseGraphqlConfig(watch),
        this.apolloGenerateConfig({
          schema,
          outputPath,
          extension: 'd',
        }),
        this.schemaGenerateConfig({
          schema,
          outputPath,
        }),
      ),
    )

    return await generate(
      merge(
        this.baseGraphqlConfig(watch),
        this.apolloGenerateConfig({
          schema,
          outputPath,
          extension: 'd',
        }),
        this.schemaGenerateConfig({
          schema,
          outputPath,
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

  private schemaGenerateConfig({ schema }: BaseCodegenConfig): Types.Config {
    return {
      generates: {
        [path.resolve(process.cwd(), schema)]: {
          schema,
          plugins: ['schema-ast'],
        },
      },
    }
  }
}
