/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IToggleController } from './toggle.service.interface'

/**
 * Used for base modal, since a class can only implement an object type or intersection of object types with statically known members
 */
export type IModalService<
  Metadata extends object = object,
  Properties extends object = Record<string, any>,
> = IToggleController<Metadata> & {
  /**
   * Previously used partial, but we want the key to exist, ust that the value we are not sure about
   */
  [K in keyof Properties]: Properties[K] | undefined
}

export type IEntityModalService<
  /**
   * Thought to use ref at first, but some cases we don't have ref since aggregate holds the model directly
   *
   * Ref's need to be attached to root tree, so ad hoc adding ref to tree just to pass it in here makes little sense
   *
   * But using model doesn't work, since it already has a parent
   */
  Metadata extends ArrayOrSingle<Ref<AnyModel>>,
  /**
   * With this interface, you can't have an object that has a property of a type other than number. It's restrictive in that sense.
   *
   * However, with a type, TypeScript allows the object to have properties that don't necessarily adhere to the index signature, in addition to properties that do.
   */
  Properties extends Record<string, ArrayOrSingle<AnyModel>> = Record<
    string,
    any
  >,
> = IToggleController<Metadata> & {
  [K in keyof Properties]: Properties[K] | undefined
}

export interface ICRUDModalService<
  Metadata extends ArrayOrSingle<Ref<AnyModel>>,
  Properties extends Record<string, AnyModel>,
> {
  createModal: IModalService
  deleteModal: IEntityModalService<Metadata, Properties>
  updateModal: IEntityModalService<Metadata, Properties>
}
