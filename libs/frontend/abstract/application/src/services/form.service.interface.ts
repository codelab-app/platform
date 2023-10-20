/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyModel } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IToggleController } from './toggle.service.interface'

export type IFormService<
  Metadata extends object = object,
  Properties extends object = Record<string, any>,
> = IToggleController<Metadata> & {
  /**
   * Previously used partial, but we want the key to exist, ust that the value we are not sure about
   */
  [K in keyof Properties]: Properties[K] | undefined
}

export type IEntityFormService<
  Metadata extends ArrayOrSingle<AnyModel>,
  Properties extends Record<string, ArrayOrSingle<AnyModel>> = Record<
    string,
    any
  >,
> = IToggleController<Metadata> & {
  [K in keyof Properties]: Properties[K] | undefined
}

export interface ICRUDFormService<
  Metadata extends ArrayOrSingle<AnyModel>,
  Properties extends Record<string, AnyModel>,
> {
  createForm: IFormService
  updateForm: IEntityFormService<Metadata, Properties>
}
