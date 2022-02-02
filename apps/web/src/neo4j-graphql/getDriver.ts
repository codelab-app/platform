import neo4j, { Driver } from 'neo4j-driver'

let driver: Driver

const defaultOptions = {
  uri: process.env.NEO4J_URI as string,
  username: process.env.NEO4J_USER as string,
  password: process.env.NEO4J_PASSWORD as string,
}

export const getDriver = () => {
  const { uri, username, password } = defaultOptions

  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
  }

  return driver
}
