import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { FieldSchema } from '../field/field.dto.interface'
import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const InterfaceTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.InterfaceType}`),
  Type.Object({
    fields: Type.Array(Typebox.Ref, { default: [] }),
  }),
])

export type IInterfaceTypeDto = Static<typeof InterfaceTypeDtoSchema>

export const InterfaceTypeSchema = Typebox.Overwrite(
  InterfaceTypeDtoSchema,
  Type.Object({
    fields: Type.Array(FieldSchema),
  }),
)

export type IInterfaceType = Static<typeof InterfaceTypeSchema>

export type ICreateInterfaceTypeDto = Pick<IInterfaceTypeDto, 'id' | 'name'>

/**
 * Entity
 */
export const InterfaceTypeRefSchema = Typebox.DiscriminatedRef(
  ITypeKind.InterfaceType,
)

export type IInterfaceTypeRef = Static<typeof InterfaceTypeRefSchema>
