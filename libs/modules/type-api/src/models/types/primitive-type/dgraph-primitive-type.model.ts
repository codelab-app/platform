import { DgraphModelMetadata } from '@codelab/backend'
import {
  baseDgraphTypeMetadata,
  baseDgraphTypeSchema,
  DgraphType,
} from '../dgraph-type.model'
import { PrimitiveKind, primitiveKindSchema } from './primitive-kind.model'

export enum PrimitiveTypeFields {
  Kind = 'PrimitiveType.primitiveKind',
}

export class DgraphPrimitiveType extends DgraphType<'PrimitiveType'> {
  [PrimitiveTypeFields.Kind]: PrimitiveKind

  static Metadata = baseDgraphTypeMetadata.extend(
    new DgraphModelMetadata('PrimitiveType', PrimitiveTypeFields),
  )

  static Schema = baseDgraphTypeSchema('PrimitiveType').extend({
    [PrimitiveTypeFields.Kind]: primitiveKindSchema,
  })
}
