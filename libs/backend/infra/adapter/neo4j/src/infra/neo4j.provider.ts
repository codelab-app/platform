import { getEnv } from '@codelab/shared/config'
import type { Provider } from '@nestjs/common'
import neo4j from 'neo4j-driver'
import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'

export const Neo4jDriverProvider: Provider = {
  provide: NEO4J_DRIVER_PROVIDER,
  useFactory: () => {
    const password = getEnv().neo4j.password
    const uri = getEnv().neo4j.uri
    const username = getEnv().neo4j.user

    return neo4j.driver(uri, neo4j.auth.basic(username, password))
  },
}
