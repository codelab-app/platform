import type { TKind, TSchema } from '@sinclair/typebox'

export interface ISchemaProvider {
  register(kind: TKind, tSchema: TSchema): void
}
