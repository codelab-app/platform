import type { AnyModel } from 'mobx-keystone'
import type { IRef } from '../base'

/**
 * Extended by our domain models
 */
export interface IModel<CreateInput, UpdateInput, DeleteInput, ISerialized>
  extends AnyModel,
    IRef {
  toJson: ISerialized

  toCreateInput(): CreateInput
  // toDeleteInput(): DeleteInput
  toUpdateInput(): UpdateInput
}
