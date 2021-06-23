import {
  DgraphArrayInnerValueFragment,
  DgraphArrayValueFragment,
  DgraphPropValueFragment,
} from '@codelab/dgraph'
import { z, ZodSchema } from 'zod'
import { ArrayValue, DgraphArrayValue } from '../array-value'
import { BooleanValue, DgraphBooleanValue } from '../boolean-value'
import { DgraphFloatValue, FloatValue } from '../float-value'
import { DgraphIntValue, IntValue } from '../int-value'
import { DgraphInterfaceValue, InterfaceValue } from '../interface-value'
import { DgraphStringValue, StringValue } from '../string-value'

export type DgraphPropValue =
  | DgraphStringValue
  | DgraphIntValue
  | DgraphFloatValue
  | DgraphBooleanValue
  | DgraphArrayValue
  | DgraphInterfaceValue

export const dgraphPropValueSchema: ZodSchema<DgraphPropValue> = z.lazy(() =>
  z.union([
    DgraphStringValue.Schema,
    DgraphIntValue.Schema,
    DgraphFloatValue.Schema,
    DgraphBooleanValue.Schema,
    DgraphArrayValue.Schema,
    DgraphInterfaceValue.Schema,
  ]),
)
