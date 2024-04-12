import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import type { CypressBuilderCommands } from './builder/builder.register'
import { builderCommands } from './builder/builder.register'
import type { CypressMobxCommands } from './mobx/mobx.register'
import { mobxCommands } from './mobx/mobx.register'
import type { CypressTagCommands } from './tags/tag.register'
import { tagCommands } from './tags/tag.register'

export type E2eCommands = CypressBuilderCommands &
  CypressMobxCommands &
  CypressTagCommands

export const commands: Array<CypressCommand> = [
  ...builderCommands,
  ...tagCommands,
  ...mobxCommands,
]
