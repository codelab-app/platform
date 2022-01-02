import { Maybe } from '@codelab/shared/abstract/types'
import { loadFilesSync } from '@graphql-tools/load-files'
import { Inject, Injectable } from '@nestjs/common'
import { DocumentNode, EnumTypeDefinitionNode } from 'graphql'
import type { DgraphConfig } from '../dgraph'
import { dgraphConfig } from '../dgraph'
import type { GraphqlSchemaConfig } from './config/graphql-schema.config'
import { graphqlSchemaConfig } from './config/graphql-schema.config'

@Injectable()
export class GraphqlSchemaService {
  constructor(
    @Inject(dgraphConfig.KEY) private readonly _dgraphConfig: DgraphConfig,
    @Inject(graphqlSchemaConfig.KEY)
    private readonly _graphqlSchemaConfig: GraphqlSchemaConfig,
  ) {}

  getEnumTypeDef(
    enumType: string,
    schema: DocumentNode,
  ): Maybe<EnumTypeDefinitionNode> {
    return schema.definitions.find(
      (def): def is EnumTypeDefinitionNode =>
        def.kind === 'EnumTypeDefinition' && def.name.value === enumType,
    )
  }

  loadGraphqlSchema(schemaPath: string) {
    return loadFilesSync<DocumentNode>(schemaPath, {
      extensions: ['graphql'],
    })
  }
}
