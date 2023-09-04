import { Module } from '@nestjs/common'
import { Neo4jModule } from './infra/neo4j.module'
import { OgmModule } from './infra/ogm.module'
import { PureResolverProvider } from './resolver'
import { ElementResolverProvider } from './resolver/ogm-resolver/element'
import { OgmResolverProvider } from './resolver/ogm-resolver/ogm-resolver.provider'
import { TagResolverProvider } from './resolver/ogm-resolver/tag'
import { TypeResolverProvider } from './resolver/pure-resolver/type'
import { GRAPHQL_SCHEMA_PROVIDER, GraphQLSchemaProvider } from './schema'

@Module({
  exports: [GRAPHQL_SCHEMA_PROVIDER],
  imports: [Neo4jModule, OgmModule],
  providers: [
    TypeResolverProvider,
    PureResolverProvider,
    OgmResolverProvider,
    ElementResolverProvider,
    TagResolverProvider,
    GraphQLSchemaProvider,
  ],
})
export class GraphQLSchemaModule {}
