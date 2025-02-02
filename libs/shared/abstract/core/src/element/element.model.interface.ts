import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { PropSchema } from '../prop'
import { ElementDtoSchema } from './element.dto.interface'

export const ElementSchema = Type.Object({
  ...ElementDtoSchema.properties,
  props: PropSchema,
})

export type IElement = Static<typeof ElementSchema>
