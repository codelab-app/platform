import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { PropSchema } from '../prop'
import { PropDtoSchema } from '../prop/prop.dto.interface'
import { IResourceType } from './resource-type.enum'

export const ResourceDtoSchema = Type.Object({
  config: PropDtoSchema,
  id: Type.String(),
  name: Type.String(),
  type: Type.Enum(IResourceType),
})

export type IResourceDto = Static<typeof ResourceDtoSchema>

export const ResourceSchema = Type.Object({
  config: PropSchema,
  id: Type.String(),
  name: Type.String(),
  type: Type.Enum(IResourceType),
})

export type IResource = Static<typeof ResourceSchema>
