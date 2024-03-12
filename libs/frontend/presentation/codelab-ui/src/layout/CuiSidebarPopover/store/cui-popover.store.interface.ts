import type { ModelActionKey } from '@codelab/frontend/abstract/types'

export interface IPopoverStore {
  close(): void
  isAnyPopoverOpen(): boolean
  isOpen(id: ModelActionKey): boolean
  open(id: ModelActionKey): void
}
