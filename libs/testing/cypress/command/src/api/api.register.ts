import type { CypressCommand } from '../command.interface'
import { platformApiRequest } from './api'

export interface CypressApiCommands {
  platformApiRequest: typeof platformApiRequest
}

export const apiCommands: Array<CypressCommand> = [
  { fn: platformApiRequest, name: 'platformApiRequest' },
]
