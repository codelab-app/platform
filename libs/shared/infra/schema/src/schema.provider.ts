import { Kind, type TKind, type TSchema, TypeRegistry } from '@sinclair/typebox'
import type { ValidateFunction } from 'ajv'
import Ajv from 'ajv'
import { AtLeastOneSchema, TAtLeastOne } from './schema/at-least-one.schema'

const schemas = { [TAtLeastOne[Kind]]: AtLeastOneSchema }

export interface ISchemaProvider {
  register(kind: TKind, tSchema: TSchema): void
}

class SchemaProvider implements ISchemaProvider {
  static getInstance(): SchemaProvider {
    if (!SchemaProvider.instance) {
      SchemaProvider.instance = new SchemaProvider()
    }

    return SchemaProvider.instance
  }

  ajv: Ajv

  addSchema(schema: object, key?: string): void {
    this.ajv.addSchema(schema, key)
  }

  assertHasRegistry(kind: TKind) {
    const exists = TypeRegistry.Has(kind[Kind])

    if (!exists) {
      throw new Error(`Please register @codelab/${kind} to Typebox first`)
    }
  }

  getSchema(key: string): ValidateFunction | undefined {
    return this.ajv.getSchema(key)
  }

  /**
   * Register custom kinds first before we can assert
   */
  register(kind: TKind, tSchema: TSchema) {
    TypeRegistry.Set(kind[Kind], (schema, value) => {
      const validate = this.ajv.compile(tSchema)

      return validate(value)
    })
  }

  private static instance?: SchemaProvider

  private constructor() {
    this.ajv = new Ajv()
  }
}

export const schemaProvider = SchemaProvider.getInstance()
