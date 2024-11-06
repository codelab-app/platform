import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { PropDtoSchema } from '../prop'
import { IResourceType } from './resource-type.enum'

export const ResourceExportSchema = Type.Omit(ResourceImportSchema, ['owner'])

export const ResourceImportSchema = Type.Object({
  config: PropDtoSchema,
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.Ref,
  type: Type.Enum(IResourceType),
})
