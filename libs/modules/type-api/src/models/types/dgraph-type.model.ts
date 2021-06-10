import { z } from 'zod'
import { DgraphInterface } from '../dgraph-interface.model'
import { DgraphArrayType } from './array-type'
import { DgraphEnumType } from './enum-type'
import { DgraphSimpleType } from './simple-type'
import { DgraphUnitType } from './unit-type'

export type DgraphType =
  | DgraphSimpleType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphUnitType
  | DgraphInterface

export const dgraphTypeSchema: z.ZodSchema<DgraphType> = z.lazy(() =>
  z.union([
    DgraphSimpleType.Schema,
    DgraphArrayType.Schema,
    DgraphEnumType.Schema,
    DgraphUnitType.Schema,
    DgraphInterface.Schema,
  ]),
)
