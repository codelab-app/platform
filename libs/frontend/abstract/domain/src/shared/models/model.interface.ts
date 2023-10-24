import type { IRef } from '@codelab/shared/abstract/core'
import type { AnyModel } from 'mobx-keystone'

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
