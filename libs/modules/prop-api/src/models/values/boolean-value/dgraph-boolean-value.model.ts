import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum DgraphBooleanValueFields {
  value = 'BooleanValue.booleanValue',
}

export class DgraphBooleanValue extends DgraphModel<'BooleanValue'> {
  [DgraphBooleanValueFields.value]: boolean

  static Metadata = new DgraphModelMetadata(
    'BooleanValue',
    DgraphBooleanValueFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('BooleanValue'),
    [DgraphBooleanValueFields.value]: z.boolean(),
  })
}
