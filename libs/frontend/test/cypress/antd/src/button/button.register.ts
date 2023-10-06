import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
<<<<<<< HEAD
import type { OmitFirstArg } from '../../deprecated/types'
import type { CypressCommand } from '../types'
=======
import { getButton } from './button.command'
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)

export interface AntButtonCommands {
  getButton: OmitFirstArg<typeof getButton>
}

export const antButtonCommands: Array<CypressCommand> = [
  {
    fn: getButton,
    name: 'getButton',
    options: {
      prevSubject: 'optional' as any,
    },
  },
]
