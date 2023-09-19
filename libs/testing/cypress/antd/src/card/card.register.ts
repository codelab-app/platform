<<<<<<<< HEAD:libs/frontend/test/cypress/antd/src/card/card.register.ts
import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
========
import type { CypressCommand } from '@codelab/testing/cypress/command'
>>>>>>>> da3909c80 (test: use cli for testing import export):libs/testing/cypress/antd/src/card/card.register.ts
import type { getCardActions } from './card.command'
import { getCard, getCardContent, getCardTitle } from './card.command'

export interface AntCardCommands {
  getCard: typeof getCard
  getCardActions: typeof getCardActions
  getCardContent: typeof getCardContent
  getCardTitle: typeof getCardTitle
}

export const antCardCommands: Array<CypressCommand> = [
  {
    fn: getCard,
    name: 'getCard',
  },
  {
    fn: getCardTitle,
    name: 'getCardTitle',
  },
  {
    fn: getCardContent,
    name: 'getCardContent',
  },
  {
    fn: getCardContent,
    name: 'getCardActions',
  },
]
