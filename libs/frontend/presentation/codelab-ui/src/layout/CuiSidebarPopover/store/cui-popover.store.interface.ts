import type { UiKey } from '@codelab/frontend-abstract-types'

export interface IPopoverStore {
  isAnyPopoverOpen: boolean
  close(): void
  isOpen(id: UiKey): boolean
  open(id: UiKey): void
}
