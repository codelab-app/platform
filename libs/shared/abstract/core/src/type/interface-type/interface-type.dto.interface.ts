import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const InterfaceTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.InterfaceType}`),
  Type.Object({
    fields: Type.Optional(Type.Array(Typebox.Ref, { default: [] })),
  }),
])

export type IInterfaceTypeDto = Static<typeof InterfaceTypeDtoSchema>

export const InterfaceTypeCreateDtoSchema = Type.Omit(InterfaceTypeDtoSchema, [
  '__typename',
  'type',
  'kind',
])

export type IInterfaceTypeCreateDto = Static<
  typeof InterfaceTypeCreateDtoSchema
>

/**
 * Entity
 */
export const InterfaceTypeRefSchema = Typebox.DiscriminatedRef(
  ITypeKind.InterfaceType,
)

export type IInterfaceTypeRef = Static<typeof InterfaceTypeRefSchema>
