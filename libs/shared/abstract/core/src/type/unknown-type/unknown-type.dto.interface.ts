import type { Static } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const UnknownTypeDtoSchema = BaseTypeDtoSchema(
  `${ITypeKind.UnknownType}`,
)

export type IUnknownTypeDto = Static<typeof UnknownTypeDtoSchema>

export const UnknownTypeSchema = UnknownTypeDtoSchema

export type IUnknownType = Static<typeof UnknownTypeSchema>
