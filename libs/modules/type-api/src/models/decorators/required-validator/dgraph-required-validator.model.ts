import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum RequiredValidatorDgraphFields {
  IsRequired = 'RequiredValidator.isRequired',
}

export class DgraphRequiredValidator extends DgraphModel<'RequiredValidator'> {
  [RequiredValidatorDgraphFields.IsRequired]: boolean

  static Metadata = new DgraphModelMetadata(
    'RequiredValidator',
    RequiredValidatorDgraphFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('RequiredValidator'),
    [RequiredValidatorDgraphFields.IsRequired]: z.boolean(),
  })
}
