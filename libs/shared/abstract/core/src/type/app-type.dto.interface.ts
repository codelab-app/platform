import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IAppTypeDTO = IBaseTypeDTO(Type.Literal(`${ITypeKind.AppType}`))

export type IAppTypeDTO = Static<typeof IAppTypeDTO>

export const IAppType = IAppTypeDTO

export type IAppType = Static<typeof IAppType>
