import type { AnyModel } from 'mobx-keystone'

/**
 * Extended by our domain models
 */
export interface IModel<CreateInput, UpdateInput, DeleteInput, ISerialized>
  extends AnyModel,
    IEntity {
  toJson: ISerialized

  toCreateInput(): CreateInput
  // toDeleteInput(): DeleteInput
  toUpdateInput(): UpdateInput
}

// export interface IAggregateRoot {
//   //
// }

export interface IEntity {
  id: string
}

// export interface IValueObject {
//   //
// }
