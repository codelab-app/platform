import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IPropDTO } from './prop.dto.interface'
import { IResourceType } from './resource-type.enum'

export const IResourceDTO = Type.Object({
  config: IPropDTO,
  id: Type.String(),
  name: Type.String(),
  type: Type.Enum(IResourceType),
})

export type IResourceDTO = Static<typeof IResourceDTO>
