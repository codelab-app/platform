import type { IValidationService } from '@codelab/shared/abstract/infra'
import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static, TKind, TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { StandardValidator } from 'typebox-validators'
import {
  AllOrNoneSchema,
  AllSchema,
  AtLeastOneSchema,
  AtMostOneSchema,
  DefinedSchema,
  ExactlyOneSchema,
  NoneSchema,
  SchemaProvider,
  TAll,
  TAllOrNone,
  TAtLeastOne,
  TAtMostOne,
  TDefined,
  TExactlyOne,
  TNone,
} from '../schema'

class ValidationService implements IValidationService {
  constructor(schemaKindMap: Array<[TKind, TSchema]>) {
    this.schema = SchemaProvider.getInstance(schemaKindMap)
  }

  asserts<T extends TSchema>(
    kind: TKind,
    data: unknown,
    options?: { message: string },
  ): asserts data is Static<T> {
    try {
      const validator = this.createValidator(kind)

      return validator.assert(data as Readonly<unknown>, options?.message)
    } catch (error: unknown) {
      console.error('Assertion error:', error)
      throw new Error((error as Error).message)
    }
  }

  assertsDefined<T>(data: T): asserts data is NonNullable<T> {
    try {
      this.asserts(TDefined, data, { message: 'Data should be defined' })
    } catch (error: unknown) {
      console.error('Assertion error:', error)
      throw new Error((error as Error).message)
    }
  }

  /**
   * Parses a value or throws an `AssertError` if invalid
   */
  parseDefined<T>(data: T) {
    try {
      return Value.Parse(DefinedSchema, data) as NonNullable<T>
    } catch (error: unknown) {
      console.error('Parse error:', error)
      throw new Error((error as Error).message)
    }
  }

  validate(kind: TKind, data: Readonly<unknown>) {
    try {
      const validator = this.createValidator(kind)

      return validator.test(data)
    } catch (error: unknown) {
      console.error('Validation error:', error)
      throw new Error((error as Error).message)
    }
  }

  private createValidator(kind: TKind) {
    try {
      this.schema.assertHasRegistry(kind)

      return new StandardValidator(this.schema.tSchema(kind))
    } catch (error: unknown) {
      console.error('Validator creation error:', error)
      throw new Error((error as Error).message)
    }
  }

  private schema
}

export const Validator: IValidationService = new ValidationService([
  [TAtLeastOne, AtLeastOneSchema],
  [Typebox.TRef, Typebox.Ref],
  [TExactlyOne, ExactlyOneSchema],
  [TAllOrNone, AllOrNoneSchema],
  [TAtMostOne, AtMostOneSchema],
  [TAll, AllSchema],
  [TDefined, DefinedSchema],
  [TNone, NoneSchema],
])
