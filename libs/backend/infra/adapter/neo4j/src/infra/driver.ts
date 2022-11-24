import { EnvBuilder } from '@codelab/shared/env'
import neo4j, { Driver } from 'neo4j-driver'

const defaultOptions = () => ({
  uri: EnvBuilder().neo4j.uri,
  username: EnvBuilder().neo4j.user,
  password: EnvBuilder().neo4j.password,
})

// Keep a single driver instance if possible
let driver: Driver

export const getDriver = () => {
  const { uri, username, password } = defaultOptions()

  return (driver ??= neo4j.driver(uri, neo4j.auth.basic(username, password)))
}
