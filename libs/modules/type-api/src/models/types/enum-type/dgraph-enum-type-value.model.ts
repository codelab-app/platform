import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'

export enum EnumTypeValueDgraphFields {
  name = 'EnumTypeValue.name',
  value = 'EnumTypeValue.value',
}

export class DgraphEnumTypeValue extends DgraphModel<'EnumTypeValue'> {
  [EnumTypeValueDgraphFields.name]?: string | null;

  [EnumTypeValueDgraphFields.value]: string

  static Metadata = new DgraphModelMetadata(
    'EnumTypeValue',
    EnumTypeValueDgraphFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('EnumTypeValue'),
    [EnumTypeValueDgraphFields.name]: z.string().optional().nullable(),
    [EnumTypeValueDgraphFields.value]: z.string(),
  })
}
