import type { UiKey } from '@codelab/frontend/abstract/types'

export interface IPopoverStore {
  close(): void
  isAnyPopoverOpen(): boolean
  isOpen(id: UiKey): boolean
  open(id: UiKey): void
}
