import type { ISchemaProvider } from '@codelab/shared/abstract/infra'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ValidateFunction } from 'ajv'

import { Kind, type TKind, type TSchema, TypeRegistry } from '@sinclair/typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

/**
 * Uses the registry pattern to register custom schema
 */
export class SchemaProvider implements ISchemaProvider {
  static getInstance(schemaKindMap: Array<[TKind, TSchema]>): SchemaProvider {
    if (!SchemaProvider.instance) {
      SchemaProvider.instance = new SchemaProvider(schemaKindMap)
    }

    return SchemaProvider.instance
  }

  ajv: Ajv

  addSchema(schema: ObjectLike, key?: string): void {
    this.ajv.addSchema(schema, key)
  }

  assertHasRegistry(kind: TKind) {
    const exists = TypeRegistry.Has(kind[Kind])

    const isDefaultType =
      kind[Kind] === 'String' ||
      kind[Kind] === 'Number' ||
      kind[Kind] === 'Boolean' ||
      kind[Kind] === 'Object' ||
      kind[Kind] === 'Array' ||
      kind[Kind] === 'Null' ||
      kind[Kind] === 'Integer'

    console.log(
      'Available TypeBox registries:',
      Object.fromEntries(TypeRegistry.Entries()),
    )

    if (!exists && !isDefaultType) {
      console.log(
        'Available TypeBox registries:',
        Object.fromEntries(TypeRegistry.Entries()),
      )
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
    const ajv = addFormats(new Ajv({}), [
      'date-time',
      'time',
      'date',
      'email',
      'hostname',
      'ipv4',
      'ipv6',
      'uri',
      'uri-reference',
      'uuid',
      'uri-template',
      'json-pointer',
      'relative-json-pointer',
      'regex',
    ])

    this.ajv = ajv

    for (const [kind, schema] of schemaKindMap) {
      this.register(kind, schema)
    }
  }
}
