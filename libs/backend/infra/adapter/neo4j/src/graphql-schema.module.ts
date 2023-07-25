import { Global, Module } from '@nestjs/common'
import { Neo4jDriverProvider, OGMService } from './infra'
import { Neo4jModule } from './infra/neo4j.module'
import { OGMModule } from './infra/ogm.module'
import { OGMProvider } from './infra/ogm.provider'
import { PureResolverProvider } from './resolver'
import { ElementResolverProvider } from './resolver/ogm-resolver/element'
import { OgmResolverProvider } from './resolver/ogm-resolver/ogm-resolver.provider'
import { TagResolverProvider } from './resolver/ogm-resolver/tag'
import { TypeResolverProvider } from './resolver/pure-resolver/type'
import { GRAPHQL_SCHEMA_PROVIDER, GraphQLSchemaProvider } from './schema'

@Module({
  exports: [GRAPHQL_SCHEMA_PROVIDER],
  imports: [Neo4jModule, OGMModule],
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
