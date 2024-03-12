import type { ModelCrudKey } from '@codelab/frontend/abstract/types'

export interface IPopoverStore {
  close(): void
  isAnyPopoverOpen(): boolean
  isOpen(id: ModelCrudKey): boolean
  open(id: ModelCrudKey): void
}
