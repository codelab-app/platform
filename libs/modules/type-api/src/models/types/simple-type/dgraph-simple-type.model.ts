import { DgraphModelMetadata } from '@codelab/backend'
import {
  baseDgraphTypeMetadata,
  baseDgraphTypeSchema,
  DgraphType,
} from '../dgraph-type.model'
import {
  PrimitiveType as PrimitiveTypeEnum,
  primitiveTypeSchema,
} from '../primitive-type'

export enum SimpleTypeDgraphFields {
  PrimitiveType = 'SimpleType.primitiveType',
}

export class DgraphSimpleType extends DgraphType<'SimpleType'> {
  [SimpleTypeDgraphFields.PrimitiveType]: PrimitiveTypeEnum

  static Metadata = baseDgraphTypeMetadata.extend(
    new DgraphModelMetadata('SimpleType', SimpleTypeDgraphFields),
  )

  static Schema = baseDgraphTypeSchema('SimpleType').extend({
    [SimpleTypeDgraphFields.PrimitiveType]: primitiveTypeSchema,
  })
}
