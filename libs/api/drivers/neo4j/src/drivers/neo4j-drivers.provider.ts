import { FactoryProvider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import neo4j, { Driver } from 'neo4j-driver'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/config'

export const NEO4J_DRIVER_PROVIDER = 'NEO4J_DRIVER_PROVIDER'

export const neo4DriverProvider: FactoryProvider<Driver> = {
  provide: NEO4J_DRIVER_PROVIDER,
  inject: [ConfigService],
  useFactory: (config: ConfigService<ApiConfig>) =>
    neo4j.driver(
      config.get(ApiConfigTypes.NEO4J_URL, ''),
      neo4j.auth.basic(
        config.get(ApiConfigTypes.NEO4J_USER, ''),
        config.get(ApiConfigTypes.NEO4J_PASS, ''),
      ),
    ),
}
