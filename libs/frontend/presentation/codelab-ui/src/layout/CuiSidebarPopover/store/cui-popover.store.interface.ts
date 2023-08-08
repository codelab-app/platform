export interface IPopoverStore {
  close(): void
  isAnyPopoverOpen(): boolean
  isOpen(id: string): boolean
  open(id: string): void
}
