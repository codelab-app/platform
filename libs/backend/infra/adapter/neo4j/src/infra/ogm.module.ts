import { Global, Module } from '@nestjs/common'
import { PureResolverProvider } from '../resolver'
import { TypeResolverProvider } from '../resolver/pure-resolver/type'
import { Neo4jModule } from './neo4j.module'
import { OGM_PROVIDER } from './ogm.constant'
import { OGMProvider } from './ogm.provider'
import { OGMService } from './ogm.service'

/**
 * Used across modules, is stateless
 */
@Global()
@Module({
  exports: [OGM_PROVIDER, OGMService],
  imports: [Neo4jModule],
  providers: [
    OGMProvider,
    OGMService,
    // OGM uses pure resolvers only
    PureResolverProvider,
    TypeResolverProvider,
  ],
})
export class OGMModule {}
