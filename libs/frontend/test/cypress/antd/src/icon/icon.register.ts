import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
import { getIcon } from './icon.command'

export interface AntIconCommands {
  getIcon: OmitFirstArg<typeof getIcon>
}

export const antIconCommands: Array<CypressCommand> = [
  {
    fn: getIcon,
    name: 'getIcon',
    options: {
      prevSubject: 'optional' as any,
    },
  },
]
