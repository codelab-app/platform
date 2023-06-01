import { getEnv } from '@codelab/shared/config'
import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'

const defaultOptions = () => ({
  password: getEnv().neo4j.password,
  uri: getEnv().neo4j.uri,
  username: getEnv().neo4j.user,
})

// Keep a single driver instance if possible
let driver: Driver | undefined

export const getDriver = () => {
  const { password, uri, username } = defaultOptions()

  return (driver ??= neo4j.driver(uri, neo4j.auth.basic(username, password)))
}
