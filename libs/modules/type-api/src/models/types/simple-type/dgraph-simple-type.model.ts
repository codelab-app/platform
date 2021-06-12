import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import {
  PrimitiveType as PrimitiveTypeEnum,
  primitiveTypeSchema,
} from '../primitive-type'

export enum SimpleTypeDgraphFields {
  PrimitiveType = 'SimpleType.primitiveType',
}

export class DgraphSimpleType extends DgraphModel<'SimpleType'> {
  [SimpleTypeDgraphFields.PrimitiveType]: PrimitiveTypeEnum

  static Metadata = new DgraphModelMetadata(
    'SimpleType',
    SimpleTypeDgraphFields,
  )

  static Schema = z.object({
    ...baseFieldsZodShape('SimpleType'),
    [SimpleTypeDgraphFields.PrimitiveType]: primitiveTypeSchema,
  })
}
