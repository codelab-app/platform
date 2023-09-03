import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IFieldDTO } from '../field/field.dto.interface'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IInterfaceTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.InterfaceType}`)),
  Type.Object({
    fields: Type.Array(IFieldDTO),
  }),
])

export type IInterfaceTypeDTO = Static<typeof IInterfaceTypeDTO>
