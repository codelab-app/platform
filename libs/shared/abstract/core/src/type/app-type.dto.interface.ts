import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const IAppTypeDto = IBaseTypeDto(Type.Literal(`${ITypeKind.AppType}`))

export type IAppTypeDto = Static<typeof IAppTypeDto>

export const IAppType = IAppTypeDto

export type IAppType = Static<typeof IAppType>
