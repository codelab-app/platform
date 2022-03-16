import { CypressCommand } from '../types'
import { createPageFromScratch } from './createPageFromScratch'
import { graphqlRequest } from './graphqlRequest'

export interface CypressHelpersCommands {
  graphqlRequest: typeof graphqlRequest
  createPageFromScratch: typeof createPageFromScratch
}

export const helpersCommands: Array<CypressCommand> = [
  { name: 'createPageFromScratch', fn: createPageFromScratch },
  { name: 'graphqlRequest', fn: graphqlRequest },
]
