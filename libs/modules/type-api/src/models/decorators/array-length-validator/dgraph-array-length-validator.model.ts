import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum ArrayLengthValidatorDgraphFields {
  Min = 'ArrayLengthValidator.min',
  Max = 'ArrayLengthValidator.max',
}

export class DgraphArrayLengthValidator extends DgraphModel<'ArrayLengthValidator'> {
  [ArrayLengthValidatorDgraphFields.Min]?: number | null;

  [ArrayLengthValidatorDgraphFields.Max]?: number | null

  static Metadata = new DgraphModelMetadata(
    'ArrayLengthValidator',
    ArrayLengthValidatorDgraphFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('ArrayLengthValidator'),
    [ArrayLengthValidatorDgraphFields.Min]: z.number().optional().nullable(),
    [ArrayLengthValidatorDgraphFields.Max]: z.number().optional().nullable(),
  })
}
