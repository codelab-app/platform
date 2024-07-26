/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IToggleService } from './toggle.service.interface'

export type IFormService<
  TData extends object = object,
  Properties extends object = Record<string, any>,
> = IToggleService<TData> & {
  /**
   * Previously used partial, but we want the key to exist, ust that the value we are not sure about
   */
  [K in keyof Properties]: Properties[K] | undefined
}

export type IEntityFormService<
  TData extends ArrayOrSingle<Ref<AnyModel>>,
  Properties extends Record<string, ArrayOrSingle<AnyModel>> = Record<
    string,
    any
  >,
> = IToggleService<TData> & {
  [K in keyof Properties]: Properties[K] | undefined
}

export interface ICRUDFormService<
  TData extends ArrayOrSingle<Ref<AnyModel>>,
  Properties extends Record<string, AnyModel>,
> {
  createForm: IFormService
  updateForm: IEntityFormService<TData, Properties>
}
