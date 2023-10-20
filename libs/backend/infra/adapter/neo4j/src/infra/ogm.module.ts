import { Module } from '@nestjs/common'
import { PureResolverProvider } from '../resolver'
import { TypeResolverProvider } from '../resolver/pure-resolver/type'
import { Neo4jModule } from './neo4j.module'
import { OGM_PROVIDER } from './ogm.constant'
import { OgmProvider } from './ogm.provider'
import { OgmService } from './ogm.service'

/**
 * Used across modules, is stateless
 */
@Module({
  exports: [OGM_PROVIDER, OgmService],
  imports: [Neo4jModule],
  providers: [
    OgmProvider,
    OgmService,
    // OGM uses pure resolvers only
    PureResolverProvider,
    TypeResolverProvider,
  ],
})
export class OgmModule {}
