import type { createElementTree } from './builder.command'

export * from './builder.register'

export interface CypressBuilderCommands {
  createElementTree: typeof createElementTree
}
