<<<<<<<< HEAD:libs/frontend/test/cypress/antd/src/button/button.register.ts
import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
========
import type { OmitFirstArg } from '../../deprecated/types'
import type { CypressCommand } from '../types'
>>>>>>>> da3909c80 (test: use cli for testing import export):libs/testing/cypress/antd/src/button/button.register.ts
import { getButton } from './button.command'

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
