import { Env } from '@codelab/shared/env'
import neo4j, { Driver } from 'neo4j-driver'

const defaultOptions = () => ({
  uri: Env().neo4j.uri,
  username: Env().neo4j.user,
  password: Env().neo4j.password,
})

// Keep a single driver instance if possible
let driver: Driver

export const getDriver = () => {
  const { uri, username, password } = defaultOptions()

  return (driver ??= neo4j.driver(uri, neo4j.auth.basic(username, password)))
}
