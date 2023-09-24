import type { IResolvers } from '@graphql-tools/utils'
import { OGM } from '@neo4j/graphql-ogm'
import type { FactoryProvider } from '@nestjs/common'
import type { Driver } from 'neo4j-driver'
import { PURE_RESOLVER_PROVIDER } from '../resolver'
import { typeDefs } from '../schema'
import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'
import { OGM_PROVIDER } from './ogm.constant'

export const OgmProvider: FactoryProvider<OGM> = {
  inject: [NEO4J_DRIVER_PROVIDER, PURE_RESOLVER_PROVIDER],
  provide: OGM_PROVIDER,
  useFactory: async (driver: Driver, pureResolvers: IResolvers) => {
    const ogm = new OGM({
      driver,
      features: {
        filters: {
          ID: {
            MATCHES: true,
          },
          String: {
            MATCHES: true,
          },
        },
      },
      resolvers: pureResolvers,
      typeDefs,
    })

    await ogm.init()

    return ogm
  },
}
