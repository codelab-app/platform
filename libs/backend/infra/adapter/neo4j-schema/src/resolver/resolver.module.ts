import { ElementDomainModule } from '@codelab/backend/domain/element'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

import { ElementResolverProvider } from './element'
import { PageResolverProvider } from './page'
import { ResolverService } from './resolver.service'
import { TagResolverProvider } from './tag'
import { TypeResolverProvider } from './type'

@Module({
  exports: [ResolverService],
  imports: [ElementDomainModule, Neo4jModule],
  providers: [
    ResolverService,
    // These providers are still needed as dependencies for ResolverService
    TypeResolverProvider,
    ElementResolverProvider,
    TagResolverProvider,
    PageResolverProvider,
  ],
})
export class ResolverModule {}
