import { Typebox } from '@codelab/shared/abstract/typebox'
import {
  IEntity,
  IMaybeDiscriminatedEntity,
} from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IField } from '../field/field.dto.interface'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IInterfaceTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.InterfaceType}`)),
  Type.Object({
    fields: Type.Array(IEntity),
  }),
])

export type IInterfaceTypeDTO = Static<typeof IInterfaceTypeDTO>

export const IInterfaceType = Typebox.Overwrite(
  Typebox.RequireTypename(IInterfaceTypeDTO),
  Type.Object({
    fields: Type.Array(IField),
  }),
)

export type IInterfaceType = Static<typeof IInterfaceType>

/**
 * Entity
 */
export const IInterfaceTypeRef = IMaybeDiscriminatedEntity(
  `${ITypeKind.InterfaceType}`,
)

export type IInterfaceTypeRef = Static<typeof IInterfaceTypeRef>
