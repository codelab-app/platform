import { ComponentDomainModule } from '@codelab/backend-domain-component'
import { ElementDomainModule } from '@codelab/backend-domain-element'
import { PageDomainModule } from '@codelab/backend-domain-page'
import { TypeDomainModule } from '@codelab/backend-domain-type'
import { Neo4jModule } from '@codelab/backend-infra-adapter-neo4j-driver'
import { Module } from '@nestjs/common'

import { ComponentResolverProvider } from './component'
import { ElementResolverProvider } from './element'
import { PageResolverProvider } from './page'
import { ResolverService } from './resolver.service'
import { TagResolverProvider } from './tag'
import { TypeResolverProvider } from './type'

@Module({
  exports: [ResolverService],
  imports: [
    PageDomainModule,
    TypeDomainModule,
    ComponentDomainModule,
    ElementDomainModule,
    Neo4jModule,
  ],
  providers: [
    ResolverService,
    // These providers are still needed as dependencies for ResolverService
    TypeResolverProvider,
    ElementResolverProvider,
    TagResolverProvider,
    PageResolverProvider,
    ComponentResolverProvider,
  ],
})
export class ResolverModule {}
