import type { IToggleService } from './toggle.service.interface'

/**
 * Used for base modal, since a class can only implement an object type or intersection of object types with statically known members
 */
export type IModalService<TData = undefined, TOutput = TData> = IToggleService<
  TData,
  TOutput
>
