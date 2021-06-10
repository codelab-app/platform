import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum MinMaxValidatorDgraphFields {
  Min = 'MinMaxValidator.min',
  Max = 'MinMaxValidator.max',
}

export class DgraphMinMaxValidator extends DgraphModel<'MinMaxValidator'> {
  [MinMaxValidatorDgraphFields.Min]?: number | null;

  [MinMaxValidatorDgraphFields.Max]?: number | null

  static Metadata = new DgraphModelMetadata(
    'MinMaxValidator',
    MinMaxValidatorDgraphFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('MinMaxValidator'),
    [MinMaxValidatorDgraphFields.Min]: z.number().optional().nullable(),
    [MinMaxValidatorDgraphFields.Max]: z.number().optional().nullable(),
  })
}
