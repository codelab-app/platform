import neo4j, { Driver } from 'neo4j-driver'
import { NEO4J_PASSWORD, NEO4J_URI, NEO4J_USER } from '../env/env'

const defaultOptions = {
  uri: NEO4J_URI,
  username: NEO4J_USER,
  password: NEO4J_PASSWORD,
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
