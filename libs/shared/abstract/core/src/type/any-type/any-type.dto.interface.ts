import type { Static } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const AnyTypeDtoSchema = BaseTypeDtoSchema(`${ITypeKind.AnyType}`)

export type IAnyTypeDto = Static<typeof AnyTypeDtoSchema>

export const AnyTypeSchema = AnyTypeDtoSchema

export type IAnyType = Static<typeof AnyTypeSchema>
