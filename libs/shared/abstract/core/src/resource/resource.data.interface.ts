import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ResourceDtoSchema } from './resource.dto.interface'
import { ResourceConfigDataSchema } from './resource-config'

export const CreateResourceDataSchema = Type.Object({
  ...ResourceDtoSchema.properties,
  config: ResourceConfigDataSchema,
})

export type ICreateResourceData = Static<typeof CreateResourceDataSchema>

export type IUpdateResourceData = ICreateResourceData
