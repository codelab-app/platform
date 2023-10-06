import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { builderCommands } from './builder/builder.register'
import { tagCommands } from './tags/tag.register'

export const commands: Array<CypressCommand> = [
  ...builderCommands,
  ...tagCommands,
]
