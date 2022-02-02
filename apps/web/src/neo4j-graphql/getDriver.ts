import neo4j, { Driver } from 'neo4j-driver'

const defaultOptions = {
  uri: process.env.NEO4J_URI as string,
  username: process.env.NEO4J_USER as string,
  password: process.env.NEO4J_PASSWORD as string,
}

if (
  !defaultOptions.uri ||
  !defaultOptions.username ||
  !defaultOptions.password
) {
  throw new Error('Missing "NEO4J_URI", "NEO4J_USER", or "NEO4J_PASSWORD"')
}

// Keep a single driver instance if possible
let driver: Driver

export const getDriver = () => {
  const { uri, username, password } = defaultOptions

  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
  }

  return driver
}
