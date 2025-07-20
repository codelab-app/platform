import {
  FormatRegistry,
  Kind,
  type TKind,
  type TSchema,
  TypeRegistry,
} from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

interface TypeBoxConfig {
  formatMap: ReadonlyArray<readonly [string, (value: string) => boolean]>
  schemaKindMap: ReadonlyArray<readonly [TKind, TSchema]>
}

/**
 * Typebox provider is wrapper to register formats and types to Typebox using the Registry
 *
 * We've removed ajv for formatting
 */
export class TypeBoxProvider {
  static getInstance(config: TypeBoxConfig): TypeBoxProvider {
    if (!TypeBoxProvider.instance) {
      TypeBoxProvider.instance = new TypeBoxProvider(config)
    }

    return TypeBoxProvider.instance
  }

  assertHasRegistry(kind: TKind) {
    const exists = TypeRegistry.Has(kind[Kind])

    if (!exists) {
      throw new Error(`Please register @codelab/${kind} to Typebox first`)
    }
  }

  tSchema(kind: TKind): TSchema {
    const pair = this.config.schemaKindMap.find(
      ([schemaKind]) => schemaKind === kind,
    )

    if (!pair) {
      console.error('Failed to find schema for kind:', kind)
      console.error(
        'Available schemas:',
        this.config.schemaKindMap.map(([schemaKind]) => schemaKind),
      )
      throw new Error('Schema not found')
    }

    return pair[1]
  }

  private static instance?: TypeBoxProvider

  private constructor(private config: TypeBoxConfig) {
    this.registerFormats()
    this.registerTypes()
  }

  private registerFormat(format: string, check: (value: string) => boolean) {
    FormatRegistry.Set(format, check)
  }

  private registerFormats() {
    for (const [format, check] of this.config.formatMap) {
      this.registerFormat(format, check)
    }
  }

  private registerType(kind: TKind, schema: TSchema) {
    TypeRegistry.Set(kind[Kind], (_, value) => Value.Check(schema, value))
  }

  private registerTypes() {
    for (const [kind, schema] of this.config.schemaKindMap) {
      this.registerType(kind, schema)
    }
  }
}
