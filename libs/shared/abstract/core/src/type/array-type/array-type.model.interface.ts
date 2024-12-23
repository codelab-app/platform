import type { Static, TSchema } from '@sinclair/typebox'

import { ArrayTypeDtoSchema } from './array-type.dto.interface'

export const ArrayTypeSchema = ArrayTypeDtoSchema

export type IArrayType<T extends TSchema = never> = Static<
  ReturnType<typeof ArrayTypeSchema<T>>
>
