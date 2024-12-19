import { ElementDomainModule } from '@codelab/backend/domain/element'
import { DigitaloceanModule } from '@codelab/backend/infra/adapter/digitalocean'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

import { ResolverProvider } from './resolver'
import { ElementResolverProvider } from './resolver/element'
import { PageResolverProvider } from './resolver/page'
import { TagResolverProvider } from './resolver/tag'
import { TypeResolverProvider } from './resolver/type'
import { GRAPHQL_SCHEMA_PROVIDER, GraphQLSchemaProvider } from './schema'

@Module({
  exports: [GRAPHQL_SCHEMA_PROVIDER],
  imports: [Neo4jModule, DigitaloceanModule, ElementDomainModule],
  providers: [
    // Added here to inject into `ResolverProvider`
    TypeResolverProvider,
    ElementResolverProvider,
    TagResolverProvider,
    PageResolverProvider,
    // Merges providers above
    ResolverProvider,
    // Exports this
    GraphQLSchemaProvider,
  ],
})
export class GraphQLSchemaModule {}
