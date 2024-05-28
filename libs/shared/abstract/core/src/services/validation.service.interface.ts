export interface IValidationService<T> {
  asserts(value: unknown): asserts value is T
  validate(data: unknown): boolean
}
