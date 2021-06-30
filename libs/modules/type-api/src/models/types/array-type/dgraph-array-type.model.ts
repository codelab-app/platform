import { DgraphModelMetadata } from '@codelab/backend'
import { z } from 'zod'
import { DgraphTypeUnion, dgraphTypeUnionSchema } from '../allDgraphTypes'
import {
  baseDgraphTypeMetadata,
  baseDgraphTypeSchema,
  DgraphType,
} from '../dgraph-type.model'

export enum ArrayTypeDgraphFields {
  Type = 'ArrayType.type',
}

export class DgraphArrayType extends DgraphType<'ArrayType'> {
  [ArrayTypeDgraphFields.Type]: DgraphTypeUnion

  static Metadata = baseDgraphTypeMetadata.extend(
    new DgraphModelMetadata('ArrayType', ArrayTypeDgraphFields),
  )

  static Schema: z.ZodLazy<z.ZodSchema<DgraphArrayType>> = z.lazy(
    () =>
      baseDgraphTypeSchema('ArrayType').extend({
        [ArrayTypeDgraphFields.Type]: dgraphTypeUnionSchema,
      }) as any,
  )
}
