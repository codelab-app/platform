import { ElementDomainModule } from '@codelab/backend/domain/element'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

import { ElementResolverProvider } from './element'
import { PageResolverProvider } from './page'
import { RESOLVER_PROVIDER, ResolverProvider } from './resolver.provider'
import { TagResolverProvider } from './tag'
import { TypeResolverProvider } from './type'

@Module({
  exports: [RESOLVER_PROVIDER],
  imports: [ElementDomainModule, Neo4jModule],
  providers: [
    // Added here to inject into `ResolverProvider`
    TypeResolverProvider,
    ElementResolverProvider,
    TagResolverProvider,
    PageResolverProvider,
    // Merges providers above
    {
      provide: RESOLVER_PROVIDER,
      useClass: ResolverProvider,
    },
  ],
})
export class ResolverModule {}
