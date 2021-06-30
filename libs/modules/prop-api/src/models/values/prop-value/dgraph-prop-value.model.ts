import { DgraphEnumTypeValue } from '@codelab/modules/type-api'
import { z, ZodSchema } from 'zod'
import { DgraphArrayValue } from '../array-value'
import { DgraphBooleanValue } from '../boolean-value'
import { DgraphFloatValue } from '../float-value'
import { DgraphIntValue } from '../int-value'
import { DgraphInterfaceValue } from '../interface-value'
import { DgraphStringValue } from '../string-value'

export type DgraphPropValue =
  | DgraphStringValue
  | DgraphIntValue
  | DgraphFloatValue
  | DgraphBooleanValue
  | DgraphArrayValue
  | DgraphInterfaceValue
  | DgraphEnumTypeValue

export const dgraphPropValueSchema: ZodSchema<DgraphPropValue> = z.lazy(() =>
  z.union([
    DgraphStringValue.Schema,
    DgraphIntValue.Schema,
    DgraphFloatValue.Schema,
    DgraphBooleanValue.Schema,
    DgraphArrayValue.Schema,
    DgraphInterfaceValue.Schema,
    DgraphEnumTypeValue.Schema,
  ]),
) as any
