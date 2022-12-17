import type { CypressCommand } from '../types'
import { createPageFromScratch } from './createPageFromScratch'
import type { CypressGraphQLHelpersCommands } from './graphql.commands'
import { graphQLCommands } from './graphql.commands'

export interface CypressHelpersCommands extends CypressGraphQLHelpersCommands {
  createPageFromScratch: typeof createPageFromScratch
}

export const helpersCommands: Array<CypressCommand> = [
  ...graphQLCommands,
  { name: 'createPageFromScratch', fn: createPageFromScratch },
]
