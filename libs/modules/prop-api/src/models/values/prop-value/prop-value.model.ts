import { EnumTypeValue } from '@codelab/modules/type-api'
import { createUnionType } from '@nestjs/graphql'
import { z } from 'zod'
import { ArrayValue } from '../array-value'
import { BooleanValue } from '../boolean-value'
import { FloatValue } from '../float-value'
import { IntValue } from '../int-value'
import { InterfaceValue } from '../interface-value'
import { StringValue } from '../string-value'

export const PropValue = createUnionType({
  name: 'PropValue',
  types: () => [
    StringValue,
    IntValue,
    FloatValue,
    BooleanValue,
    ArrayValue,
    InterfaceValue,
    EnumTypeValue,
  ],
})

export type PropValue = typeof PropValue

export const propValueSchema: z.ZodSchema<PropValue> = z.lazy(() =>
  z.union([
    StringValue.Schema,
    IntValue.Schema,
    FloatValue.Schema,
    BooleanValue.Schema,
    ArrayValue.Schema,
    InterfaceValue.Schema,
    EnumTypeValue.Schema,
  ]),
)
