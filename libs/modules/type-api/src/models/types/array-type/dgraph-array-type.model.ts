import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { DgraphType, dgraphTypeSchema } from '../dgraph-type.model'

export enum ArrayTypeDgraphFields {
  Type = 'ArrayType.type',
}

export class DgraphArrayType extends DgraphModel<'ArrayType'> {
  [ArrayTypeDgraphFields.Type]: DgraphType

  static Metadata = new DgraphModelMetadata('ArrayType', ArrayTypeDgraphFields)

  static Schema = z.object({
    ...baseFieldsZodShape('ArrayType'),
    [ArrayTypeDgraphFields.Type]: dgraphTypeSchema,
  })
}
