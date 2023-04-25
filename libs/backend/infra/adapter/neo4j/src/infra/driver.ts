import { EnvPlatform } from '@codelab/shared/infra/config'
import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'

const defaultOptions = () => ({
  password: EnvPlatform().neo4j.password,
  uri: EnvPlatform().neo4j.uri,
  username: EnvPlatform().neo4j.user,
})

// Keep a single driver instance if possible
let driver: Driver

export const getDriver = () => {
  const { password, uri, username } = defaultOptions()

  return (driver ??= neo4j.driver(uri, neo4j.auth.basic(username, password)))
}
