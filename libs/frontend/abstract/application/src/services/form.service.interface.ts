/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IToggleService } from './toggle.service.interface'

export type IFormService<
  TToggleData = undefined,
  TAdditionalProperties extends Record<string, void> | undefined = undefined,
> = IToggleService<TToggleData, TAdditionalProperties>

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
  createForm: IToggleService
  updateForm: IEntityFormService<TData, Properties>
}
