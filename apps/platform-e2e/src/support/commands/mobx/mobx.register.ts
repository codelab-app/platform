import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { getMobxStore } from './mobx.command'

export interface CypressMobxCommands {
  getMobxStore: typeof getMobxStore
}

export const mobxCommands: Array<CypressCommand> = [
  {
    fn: getMobxStore,
    name: 'getMobxStore',
  },
]
