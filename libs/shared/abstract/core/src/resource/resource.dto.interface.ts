import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IProp, IPropDto } from '../prop/prop.dto.interface'
import { IResourceType } from './resource-type.enum'

export const IResourceDto = Type.Object({
  config: IPropDto,
  id: Type.String(),
  name: Type.String(),
  type: Type.Enum(IResourceType),
})

export type IResourceDto = Static<typeof IResourceDto>

export const IResource = Type.Object({
  config: IProp,
  id: Type.String(),
  name: Type.String(),
  type: Type.Enum(IResourceType),
})

export type IResource = Static<typeof IResource>
