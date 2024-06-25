import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ResourceDtoSchema } from './resource.dto.interface'
import { ResourceConfigDataSchema } from './resource-config'

export const CreateResourceDataSchema = Typebox.Overwrite(
  ResourceDtoSchema,
  Type.Object({
    config: ResourceConfigDataSchema,
  }),
)

export type ICreateResourceData = Static<typeof CreateResourceDataSchema>

export type IUpdateResourceData = ICreateResourceData
