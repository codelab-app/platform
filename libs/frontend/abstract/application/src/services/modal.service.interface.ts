/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IToggleService } from './toggle.service.interface'

/**
 * Used for base modal, since a class can only implement an object type or intersection of object types with statically known members
 */
export type IModalService<TData = undefined, TOutput = TData> = IToggleService<
  TData,
  TOutput
>

export type IEntityModalService<
  /**
   * Thought to use ref at first, but some cases we don't have ref since aggregate holds the model directly
   *
   * Ref's need to be attached to root tree, so ad hoc adding ref to tree just to pass it in here makes little sense
   *
   * But using model doesn't work, since it already has a parent
   */
  TToggleData extends ArrayOrSingle<Ref<AnyModel>>,
  /**
   * With this interface, you can't have an object that has a property of a type other than number. It's restrictive in that sense.
   *
   * However, with a type, TypeScript allows the object to have properties that don't necessarily adhere to the index signature, in addition to properties that do.
   */
  TAdditionalProperties extends Record<
    string,
    ArrayOrSingle<AnyModel>
  > = Record<string, any>,
> = IToggleService<TToggleData, TAdditionalProperties>

export interface ICRUDModalService<
  TData extends ArrayOrSingle<Ref<AnyModel>>,
  Properties extends Record<string, AnyModel>,
> {
  createModal: IModalService
  deleteModal: IEntityModalService<TData, Properties>
  updateModal: IEntityModalService<TData, Properties>
}
