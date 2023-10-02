import type { CypressCommand } from '../utils/command.interface'
import { postApiRequest } from './api.command'

export interface CypressApiCommands {
  postApiRequest: typeof postApiRequest
}

export const apiCommands: Array<CypressCommand> = [
  { fn: postApiRequest, name: 'postApiRequest' },
]
