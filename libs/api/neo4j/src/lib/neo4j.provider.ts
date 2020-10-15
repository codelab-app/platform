import neo4j from 'neo4j-driver'

export const NEO4J_PROVIDER = 'NEO4J_PROVIDER'

export const neo4jProvider = {
  provide: NEO4J_PROVIDER,
  useFactory: () =>
    neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password')),
}
