import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { DgraphEnumTypeValue } from './dgraph-enum-type-value.model'

export enum EnumTypeDgraphFields {
  AllowedValues = 'EnumType.allowedValues',
}

export class DgraphEnumType extends DgraphModel<'EnumType'> {
  [EnumTypeDgraphFields.AllowedValues]?: Array<DgraphEnumTypeValue> | null

  static Metadata = new DgraphModelMetadata('EnumType', EnumTypeDgraphFields)

  static Schema = z.object({
    ...baseFieldsZodShape('EnumType'),
    [EnumTypeDgraphFields.AllowedValues]: z
      .array(DgraphEnumTypeValue.Schema)
      .optional()
      .nullable(),
  })
}
