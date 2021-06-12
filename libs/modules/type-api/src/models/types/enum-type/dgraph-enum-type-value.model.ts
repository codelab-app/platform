import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum EnumTypeValueDgraphFields {
  Name = 'EnumTypeValue.name',
}

export class DgraphEnumTypeValue extends DgraphModel<'EnumTypeValue'> {
  [EnumTypeValueDgraphFields.Name]: string

  static Metadata = new DgraphModelMetadata(
    'EnumTypeValue',
    EnumTypeValueDgraphFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('EnumTypeValue'),
    [EnumTypeValueDgraphFields.Name]: z.string(),
  })
}
