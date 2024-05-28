import {
  IRef,
  SchemaKinds,
  SchemaKindsMap,
  UserKind,
} from '@codelab/shared/abstract/core'
import { type TSchema, TypeRegistry } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import type { Schema, ValidateFunction } from 'ajv'
import Ajv from 'ajv'

export interface ISchemaProvider {
  // asserts<T>(kind: keyof typeof SchemaKinds, value: unknown): asserts value is T
  register(kind: keyof typeof SchemaKinds, tSchema: Schema): void
  // validate(kind: keyof typeof SchemaKinds, data: unknown): boolean
}

class SchemaProvider implements ISchemaProvider {
  static getInstance(): SchemaProvider {
    if (!SchemaProvider.instance) {
      SchemaProvider.instance = new SchemaProvider()

      // SchemaProvider.instance.register(SchemaKinds.Ref, IRef)
    }

    return SchemaProvider.instance
  }

  ajv: Ajv

  addSchema(schema: object, key?: string): void {
    this.ajv.addSchema(schema, key)
  }

  /**
   * becomes this basically
   *
   * const assertIsRef: AssertIsSchema<IRef> = (val) =>
  Value.Decode(RefKind, val)
   */
  // asserts<T>(
  //   kind: keyof typeof SchemaKinds,
  //   value: unknown,
  // ): asserts value is T {
  //   const tSchema = SchemaKindsMap[kind]

  //   Value.Decode(tSchema, value)
  // }

  getSchema(key: string): ValidateFunction | undefined {
    return this.ajv.getSchema(key)
  }

  /**
   * Register custom kinds first before we can assert
   */
  register(kind: keyof typeof SchemaKinds, tSchema: Schema) {
    TypeRegistry.Set(`@codelab/${kind}`, (schema, value) => {
      const validate = this.ajv.compile(tSchema)

      return validate(value)
    })
  }

  // validate(kind: keyof typeof SchemaKinds, data: unknown): boolean {
  //   const tSchema = SchemaKindsMap[kind]

  //   return Value.Check(tSchema, data)
  // }

  private static instance?: SchemaProvider

  private constructor() {
    this.ajv = new Ajv()
  }
}

export const schemaProvider = SchemaProvider.getInstance()
