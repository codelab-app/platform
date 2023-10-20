/**
 * Re-useable interface that allows some UI to be toggled open and close
 */
export interface IToggleController<Metadata extends object> {
  isOpen: boolean
  metadata: Metadata | undefined

  close(): void
  open(args?: Metadata): void
}
