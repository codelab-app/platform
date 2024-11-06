import { Type } from '@sinclair/typebox'

import { PropDtoSchema } from '../prop'
import { ElementDtoSchema } from './element.dto.interface'

export const ElementExportSchema = Type.Object({
  ...ElementDtoSchema.properties,
  props: PropDtoSchema,
})
