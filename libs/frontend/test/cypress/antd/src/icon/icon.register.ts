import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
import type { OmitFirstArg } from '../../deprecated/types'
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
