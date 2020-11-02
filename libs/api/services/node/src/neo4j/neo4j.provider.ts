import { FactoryProvider, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import neo4j, { Driver } from 'neo4j-driver'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

export const NEO4J_DRIVERS_PROVIDER = 'NEO4J_DRIVERS_PROVIDER'

export const neo4DriversProvider: FactoryProvider<Driver> = {
  provide: NEO4J_DRIVERS_PROVIDER,
  inject: [ConfigService],
  useFactory: (config: ConfigService<ApiConfig>) => {
    Logger.log(config.get(ApiConfigTypes.NEO4J_URL), 'neo4j.provider.ts')

    return neo4j.driver(
      config.get(ApiConfigTypes.NEO4J_URL, ''),
      neo4j.auth.basic(
        config.get(ApiConfigTypes.NEO4J_USER, ''),
        config.get(ApiConfigTypes.NEO4J_PASS, ''),
      ),
    )
  },
}
