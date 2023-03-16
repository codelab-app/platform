/**
 * Extended by our domain models
 */
export interface IModel<CreateInput, UpdateInput, DeleteInput> {
  toCreateInput(): CreateInput
  toDeleteInput(): DeleteInput
  toUpdateInput(): UpdateInput
}
