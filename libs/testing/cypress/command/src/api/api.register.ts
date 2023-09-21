import type { CypressCommand } from '../command.interface'
import { postApiRequest } from './api'

export interface CypressApiCommands {
  postApiRequest: typeof postApiRequest
}

export const apiCommands: Array<CypressCommand> = [
  { fn: postApiRequest, name: 'postApiRequest' },
]
