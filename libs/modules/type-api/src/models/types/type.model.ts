import { createUnionType } from '@nestjs/graphql'
import { z } from 'zod'
import { ArrayType, arrayTypeSchema } from './array-type'
import { EnumType, enumTypeSchema } from './enum-type'
import { InterfaceType, interfaceTypeSchema } from './interface-type'
import { SimpleType, simpleTypeSchema } from './simple-type'
import { UnitType, unitTypeSchema } from './unit-type'

/**
 * An union type for all the types we can have
 * If new types are added, update GetRecursiveInterfaceQueryBuilder and GetTypeQueryBuilder
 */
export const Type = createUnionType({
  name: 'Type',
  types: () => [SimpleType, ArrayType, EnumType, UnitType, InterfaceType],
})

/** An union type for all the types we can have */
export type Type = typeof Type

export const typeSchema: z.ZodSchema<Type> = z.union([
  simpleTypeSchema,
  arrayTypeSchema,
  enumTypeSchema,
  unitTypeSchema,
  interfaceTypeSchema,
])
