import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IField } from '../field/field.dto.interface'
import { IDiscriminatedRef, IRef } from '../model/ref.interface'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IInterfaceTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.InterfaceType}`)),
  Type.Object({
    fields: Type.Array(IRef, { default: [] }),
  }),
])

export type IInterfaceTypeDto = Static<typeof IInterfaceTypeDto>

export const IInterfaceType = Typebox.Overwrite(
  IInterfaceTypeDto,
  Type.Object({
    fields: Type.Array(IField),
  }),
)

export type IInterfaceType = Static<typeof IInterfaceType>

export type ICreateInterfaceTypeDto = Pick<IInterfaceTypeDto, 'id' | 'name'>

/**
 * Entity
 */
export const IInterfaceTypeRef = IDiscriminatedRef(ITypeKind.InterfaceType)

export type IInterfaceTypeRef = Static<typeof IInterfaceTypeRef>
