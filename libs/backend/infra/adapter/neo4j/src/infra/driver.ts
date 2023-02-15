import { EnvBuilder } from '@codelab/shared/env'
import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'

const defaultOptions = () => ({
  uri: EnvBuilder().neo4j.uri,
  username: EnvBuilder().neo4j.user,
  password: EnvBuilder().neo4j.password,
})

// Keep a single driver instance if possible
let driver: Driver

export const getDriver = () => {
  const { uri, username, password } = defaultOptions()

  // console.log(uri)

  return (driver ??= neo4j.driver(uri, neo4j.auth.basic(username, password)))
}
