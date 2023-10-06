import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { postApiRequest } from './api.command'

export interface CypressApiCommands {
  postApiRequest: typeof postApiRequest
}

export const apiCommands: Array<CypressCommand> = [
  { fn: postApiRequest, name: 'postApiRequest' },
]
