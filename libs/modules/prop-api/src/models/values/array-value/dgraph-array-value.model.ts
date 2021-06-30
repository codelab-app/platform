import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { DgraphPropValue, dgraphPropValueSchema } from '../prop-value'

export enum DgraphArrayValueFields {
  values = 'ArrayValue.values',
}

export class DgraphArrayValue extends DgraphModel<'ArrayValue'> {
  [DgraphArrayValueFields.values]: Array<DgraphPropValue>

  static Metadata = new DgraphModelMetadata(
    'ArrayValue',
    DgraphArrayValueFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('ArrayValue'),
    [DgraphArrayValueFields.values]: z.lazy(() =>
      dgraphPropValueSchema.array(),
    ),
  })
}
