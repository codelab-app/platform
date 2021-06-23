import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum DgraphStringValueFields {
  value = 'StringValue.stringValue',
}

export class DgraphStringValue extends DgraphModel<'StringValue'> {
  [DgraphStringValueFields.value]: string

  static Metadata = new DgraphModelMetadata(
    'StringValue',
    DgraphStringValueFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('StringValue'),
    [DgraphStringValueFields.value]: z.string(),
  })
}
