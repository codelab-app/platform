import { DigitaloceanModule } from '@codelab/backend/infra/adapter/digitalocean'
import { Module } from '@nestjs/common'

import { Neo4jModule } from './infra/neo4j.module'
import { ResolverProvider } from './resolver'
import { ElementResolverProvider } from './resolver/element'
import { TagResolverProvider } from './resolver/tag'
import { TypeResolverProvider } from './resolver/type'
import { GRAPHQL_SCHEMA_PROVIDER, GraphQLSchemaProvider } from './schema'

@Module({
  exports: [GRAPHQL_SCHEMA_PROVIDER],
  imports: [Neo4jModule, DigitaloceanModule],
  providers: [
    // Added here to inject into `ResolverProvider`
    TypeResolverProvider,
    ElementResolverProvider,
    TagResolverProvider,
    // Merges providers above
    ResolverProvider,
    // Exports this
    GraphQLSchemaProvider,
  ],
})
export class GraphQLSchemaModule {}
