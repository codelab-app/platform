import type { IModalService } from './modal.service.interface'

export interface ICRUDFormService<
  Metadata = never,
  Properties extends object = never,
> {
  createForm: IEntityFormService
  updateForm: IEntityFormService<Metadata, Properties>
}

export type IEntityFormService<
  Metadata = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Properties extends object = Record<string, any>,
> = IModalService<Metadata> & {
  /**
   * All properties must be partial, since we don't know whether user has opened (and set) the metadata yet
   */
  [K in keyof Properties]: Properties[K]
}
