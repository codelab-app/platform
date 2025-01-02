import type { ValidateFunction } from 'ajv'

import {
  Kind,
  type TKind,
  type TSchema,
  Type,
  TypeRegistry,
} from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/build/cjs/value'

export class SchemaProvider {
  static getInstance(schemaKindMap: Array<[TKind, TSchema]>): SchemaProvider {
    if (!SchemaProvider.instance) {
      SchemaProvider.instance = new SchemaProvider(schemaKindMap)
    }

    return SchemaProvider.instance
  }

  assertHasRegistry(kind: TKind) {
    const exists = TypeRegistry.Has(kind[Kind])

    if (!exists) {
      throw new Error(`Please register @codelab/${kind} to Typebox first`)
    }
  }

  /**
   * Register custom kinds first before we can assert
   */
  register(kind: TKind, tSchema: TSchema) {
    TypeRegistry.Set(kind[Kind], (schema, value) => Value.Check(tSchema, value))
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
    for (const [kind, schema] of schemaKindMap) {
      this.register(kind, schema)
    }
  }
}
