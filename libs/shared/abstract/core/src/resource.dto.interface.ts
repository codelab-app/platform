import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IProp } from './prop.dto.interface'
import { IResourceType } from './resource/resource-type.enum'

export const IResourceDTO = Type.Object({
  config: IProp,
  id: Type.String(),
  name: Type.String(),
  type: Type.Enum(IResourceType),
})

export type IResourceDTO = Static<typeof IResourceDTO>

export const IResource = IResourceDTO

export type IResource = Static<typeof IResource>
