import { Kind, type TSchema } from '@sinclair/typebox'
import { ObjectTyped } from 'object-typed'
import type { Writable } from 'utility-types'
import { IModelKinds } from './model-type.interface'

type Key<T extends Record<string, unknown>> = T[keyof T]

/**
 * Schema kinds
 */
export const SchemaKinds = {
  Ref: 'Ref',
  ...IModelKinds,
} as const

type ISchemaKinds = Key<typeof SchemaKinds>

/**
 * TypeKinds is the kind of all custom schema types
 *
 * const UserKind = {
  	 [Kind]: IModelType.User,
    } as TSchema
 */
type ISchemaKindsMap = Writable<{
  [key in ISchemaKinds]: TSchema
}>

export const SchemaKindsMap = ObjectTyped.keys(SchemaKinds).reduce(
  (acc, key) => {
    acc[key] = {
      // prefix so there is no conflict, `Ref` is already taken as system type
      [Kind]: `@codelab/${SchemaKinds[key]}`,
    } as TSchema

    return acc
  },
  {} as ISchemaKindsMap,
)
