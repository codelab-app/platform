import { DgraphModelMetadata } from '@codelab/backend'
import { z } from 'zod'
import {
  baseDgraphTypeMetadata,
  baseDgraphTypeSchema,
  DgraphType,
} from '../dgraph-type.model'
import { DgraphEnumTypeValue } from './dgraph-enum-type-value.model'

export enum EnumTypeDgraphFields {
  AllowedValues = 'EnumType.allowedValues',
}

export class DgraphEnumType extends DgraphType<'EnumType'> {
  [EnumTypeDgraphFields.AllowedValues]?: Array<DgraphEnumTypeValue> | null

  static Metadata = baseDgraphTypeMetadata.extend(
    new DgraphModelMetadata('EnumType', EnumTypeDgraphFields),
  )

  static Schema = baseDgraphTypeSchema('EnumType').extend({
    [EnumTypeDgraphFields.AllowedValues]: z
      .array(DgraphEnumTypeValue.Schema)
      .optional()
      .nullable(),
  })
}
