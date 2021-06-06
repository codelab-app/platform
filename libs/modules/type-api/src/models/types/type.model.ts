import { createUnionType } from '@nestjs/graphql'
import { z } from 'zod'
import { Interface, interfaceSchema } from '../interface.model'
import { ArrayType, arrayTypeSchema } from './array-type'
import { EnumType, enumTypeSchema } from './enum-type'
import { SimpleType, simpleTypeSchema } from './simple-type'
import { UnitType, unitTypeSchema } from './unit-type'

/**
 * An union type for all the types we can have
 */
export const Type = createUnionType({
  name: 'Type',
  types: () => [SimpleType, ArrayType, EnumType, UnitType, Interface],
})

export type Type = typeof Type

export const typeSchema: z.ZodSchema<Type> = z.lazy(() =>
  z.union([
    simpleTypeSchema,
    arrayTypeSchema,
    enumTypeSchema,
    unitTypeSchema,
    interfaceSchema,
  ]),
)
