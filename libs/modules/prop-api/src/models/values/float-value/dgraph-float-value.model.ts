import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum DgraphFloatValueFields {
  value = 'FloatValue.floatValue',
}

export class DgraphFloatValue extends DgraphModel<'FloatValue'> {
  [DgraphFloatValueFields.value]: number

  static Metadata = new DgraphModelMetadata(
    'FloatValue',
    DgraphFloatValueFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('FloatValue'),
    [DgraphFloatValueFields.value]: z.number(),
  })
}
