import { z } from 'zod'
import { DgraphInterface } from '../dgraph-interface.model'
import { DgraphArrayType } from './array-type'
import { DgraphEnumType } from './enum-type'
import { DgraphSimpleType } from './simple-type'

export const allDgraphTypes = [
  DgraphSimpleType,
  DgraphArrayType,
  DgraphEnumType,
  DgraphInterface,
]

export const dgraphTypeUnionSchema: z.ZodSchema<DgraphTypeUnion> = z.union([
  DgraphSimpleType.Schema,
  DgraphArrayType.Schema,
  DgraphEnumType.Schema,
  DgraphInterface.Schema,
])

export type DgraphTypeUnion =
  | DgraphSimpleType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphInterface
