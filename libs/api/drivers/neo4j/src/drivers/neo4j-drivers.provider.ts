import { FactoryProvider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import neo4j, { Driver } from 'neo4j-driver'
import { ApiConfig } from '@codelab/api/config'

export const NEO4J_DRIVER_PROVIDER = 'NEO4J_DRIVER_PROVIDER'

export const neo4DriverProvider: FactoryProvider<Driver> = {
  provide: NEO4J_DRIVER_PROVIDER,
  inject: [ConfigService],
  useFactory: (config: ConfigService<ApiConfig>) =>
    neo4j.driver(
      config.get('neo4j.url', ''),
      neo4j.auth.basic(
        config.get('neo4j.user', ''),
        config.get('neo4j.pass', ''),
      ),
    ),
}
