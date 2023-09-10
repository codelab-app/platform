import { IDiscriminatedEntity, IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const IInterfaceTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.InterfaceType}`)),
  Type.Object({
    fields: Type.Array(IEntity),
  }),
])

export type IInterfaceTypeDTO = Static<typeof IInterfaceTypeDTO>

/**
 * Entity
 */
export const IInterfaceTypeEntity = IDiscriminatedEntity(
  `${ITypeKind.InterfaceType}`,
)

export type IInterfaceTypeEntity = Static<typeof IInterfaceTypeEntity>
