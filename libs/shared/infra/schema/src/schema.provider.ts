import type { SchemaKinds } from '@codelab/shared/abstract/core'
import { TypeRegistry } from '@sinclair/typebox'
import type { Schema, ValidateFunction } from 'ajv'
import Ajv from 'ajv'

export interface ISchemaProvider {
  register(kind: keyof typeof SchemaKinds, tSchema: Schema): void
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

  assertHasRegistry(kind: keyof typeof SchemaKinds) {
    const exists = TypeRegistry.Has(`@codelab/${kind}`)

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
  register(kind: keyof typeof SchemaKinds, tSchema: Schema) {
    TypeRegistry.Set(`@codelab/${kind}`, (schema, value) => {
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
