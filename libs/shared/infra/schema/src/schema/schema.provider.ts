import type { ISchemaProvider } from '@codelab/shared/abstract/infra'
import { Kind, type TKind, type TSchema, TypeRegistry } from '@sinclair/typebox'
import type { ValidateFunction } from 'ajv'
import Ajv from 'ajv'

export class SchemaProvider implements ISchemaProvider {
  static getInstance(schemaKindMap: Array<[TKind, TSchema]>): SchemaProvider {
    if (!SchemaProvider.instance) {
      SchemaProvider.instance = new SchemaProvider(schemaKindMap)
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

  tSchema(kind: TKind): TSchema {
    const pair = this.schemaKindMap.find(([_kind]) => _kind === kind)

    if (!pair) {
      throw new Error('Not found')
    }

    return pair[1]
  }

  private static instance?: SchemaProvider

  private constructor(private schemaKindMap: Array<[TKind, TSchema]>) {
    this.ajv = new Ajv()

    for (const [kind, schema] of schemaKindMap) {
      this.register(kind, schema)
    }
  }
}
