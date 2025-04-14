import type { Static } from '@sinclair/typebox'

import { ArrayTypeDtoSchema } from './array-type.dto.interface'

export const ArrayTypeSchema = ArrayTypeDtoSchema

export type IArrayType = Static<typeof ArrayTypeSchema>
