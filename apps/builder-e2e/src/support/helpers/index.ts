import { CypressCommand } from '../types'
import { createPageFromScratch } from './createPageFromScratch'
import {
  CypressGraphQLHelpersCommands,
  graphQLCommands,
} from './graphql.commands'

export interface CypressHelpersCommands extends CypressGraphQLHelpersCommands {
  createPageFromScratch: typeof createPageFromScratch
}

export const helpersCommands: Array<CypressCommand> = [
  ...graphQLCommands,
  { name: 'createPageFromScratch', fn: createPageFromScratch },
]
