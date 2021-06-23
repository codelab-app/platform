import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum DgraphIntValueFields {
  value = 'IntValue.intValue',
}

export class DgraphIntValue extends DgraphModel<'IntValue'> {
  [DgraphIntValueFields.value]: number

  static Metadata = new DgraphModelMetadata('IntValue', DgraphIntValueFields)

  static Schema = z.object({
    ...baseFieldsZodShape('IntValue'),
    [DgraphIntValueFields.value]: z.number().int(),
  })
}
