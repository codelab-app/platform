import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ResourceConfigDataSchema } from './resource-config'
import { ResourceDtoSchema } from './resource.dto.interface'

export const CreateResourceDataSchema = Type.Object({
  ...ResourceDtoSchema.properties,
  config: ResourceConfigDataSchema,
})

export type ICreateResourceData = Static<typeof CreateResourceDataSchema>

export type IUpdateResourceData = ICreateResourceData
