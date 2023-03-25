import type { CypressCommand } from '../types'
import type { CypressGraphQLHelpersCommands } from './graphql.commands'
import { graphQLCommands } from './graphql.commands'

export type CypressHelpersCommands = CypressGraphQLHelpersCommands

export const helpersCommands: Array<CypressCommand> = [...graphQLCommands]
export * from './assertions'
