import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { PropSchema } from '../prop'
import { ElementDtoSchema } from './element.dto.interface'

export const ElementSchema = Type.Object({
  ...ElementDtoSchema.properties,
  props: PropSchema,
})

export type IElement = Static<typeof ElementSchema>
