import type { Static, TSchema } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from '../base-type.dto.interface'
import { ITypeKind } from '../type-kind.enum'

export const InterfaceTypeDtoSchema = <T extends TSchema>(schema?: T) =>
  Type.Composite([
    BaseTypeDtoSchema(`${ITypeKind.InterfaceType}`),
    Type.Object({
      fields: Type.Optional(Type.Array(Typebox.RefSchema, { default: [] })),
    }),
    ...(schema ? [schema] : []),
  ])

export type IInterfaceTypeDto<T extends TSchema = never> = Static<
  ReturnType<typeof InterfaceTypeDtoSchema<T>>
>

/**
 * Entity
 */
export const InterfaceTypeRefSchema = Typebox.DiscriminatedRef(
  ITypeKind.InterfaceType,
)

export type IInterfaceTypeRef = Static<typeof InterfaceTypeRefSchema>
