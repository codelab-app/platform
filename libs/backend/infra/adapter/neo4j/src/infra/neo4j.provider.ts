import type { FactoryProvider } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'
import { neo4jConfig } from '../neo4j.config'
import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'

export const Neo4jDriverProvider: FactoryProvider<Driver> = {
  inject: [neo4jConfig.KEY],
  provide: NEO4J_DRIVER_PROVIDER,
  useFactory: (config: ConfigType<typeof neo4jConfig>) => {
    const password = config.password
    const uri = config.uri.toString()
    const username = config.user

    console.log('neo4j', {
      password,
      uri,
      username,
    })

    const neo4jDriver = neo4j.driver(uri, neo4j.auth.basic(username, password))

    return neo4jDriver
  },
}
