import { z } from 'zod'
import { DgraphInterface } from '../dgraph-interface.model'
import { DgraphArrayType } from './array-type'
import { DgraphEnumType } from './enum-type'
import { DgraphPrimitiveType } from './primitive-type'

export const allDgraphTypes = [
  DgraphPrimitiveType,
  DgraphArrayType,
  DgraphEnumType,
  DgraphInterface,
]

export const dgraphTypeUnionSchema: z.ZodSchema<DgraphTypeUnion> = z.union([
  DgraphPrimitiveType.Schema,
  DgraphArrayType.Schema,
  DgraphEnumType.Schema,
  DgraphInterface.Schema,
])

export type DgraphTypeUnion =
  | DgraphPrimitiveType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphInterface
