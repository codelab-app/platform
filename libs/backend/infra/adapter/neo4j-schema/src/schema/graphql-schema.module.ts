import { DigitaloceanModule } from '@codelab/backend/infra/adapter/digitalocean'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

import { ResolverModule } from '../resolver/resolver.module'
import { GRAPHQL_SCHEMA_PROVIDER } from './schema.constant'
import { GraphQLSchemaProvider } from './schema.provider'

@Module({
  exports: [GRAPHQL_SCHEMA_PROVIDER],
  imports: [Neo4jModule, DigitaloceanModule, ResolverModule],
  providers: [GraphQLSchemaProvider],
})
export class GraphQLSchemaModule {}
