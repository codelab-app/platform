import { DigitaloceanModule } from '@codelab/backend/infra/adapter/digitalocean'
import { Module } from '@nestjs/common'

import { Neo4jModule } from './infra/neo4j.module'
import { PureResolverProvider } from './resolver'
import { TypeResolverProvider } from './resolver/pure-resolver/type'
import { GRAPHQL_SCHEMA_PROVIDER, GraphQLSchemaProvider } from './schema'

@Module({
  exports: [GRAPHQL_SCHEMA_PROVIDER],
  imports: [Neo4jModule, DigitaloceanModule],
  providers: [
    TypeResolverProvider,
    PureResolverProvider,
    // Exports this
    GraphQLSchemaProvider,
  ],
})
export class GraphQLSchemaModule {}
