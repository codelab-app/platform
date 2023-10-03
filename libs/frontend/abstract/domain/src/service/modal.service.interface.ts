export interface ICRUDModalService<
  Metadata = never,
  Properties extends object = never,
> {
  createModal: IEntityModalService
  deleteModal: IEntityModalService<Metadata, Properties>
  updateModal: IEntityModalService<Metadata, Properties>
}

/**
 * Used for base modal, since a class can only implement an object type or intersection of object types with statically known members
 */
export interface IModalService<Metadata = undefined> {
  isOpen: boolean
  metadata?: Metadata | null

  close(): void
  open(...args: Metadata extends undefined ? [] : [Metadata]): void
}

export type IEntityModalService<
  Metadata = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Properties extends object = Record<string, any>,
> = IModalService<Metadata> & {
  /**
   * All properties must be partial, since we don't know whether user has opened (and set) the metadata yet
   */
  [K in keyof Properties]: Properties[K]
}
