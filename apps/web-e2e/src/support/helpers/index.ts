import { CypressCommand } from '../types'
import { graphqlRequest } from './graphqlRequest'
import { jumpToBuilder } from './jumpToBuilder'

export interface CypressHelpersCommands {
  graphqlRequest: typeof graphqlRequest
  jumpToBuilder: typeof jumpToBuilder
}

export const helpersCommands: Array<CypressCommand> = [
  { name: 'jumpToBuilder', fn: jumpToBuilder },
  { name: 'graphqlRequest', fn: graphqlRequest },
]
