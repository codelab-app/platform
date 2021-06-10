import { BaseDgraphFields, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  DgraphSimpleType,
  SimpleTypeDgraphFields,
} from './dgraph-simple-type.model'
import { SimpleType, simpleTypeSchema } from './simple-type.model'

@Injectable()
export class SimpleTypeMapper
  implements IDgraphMapper<DgraphSimpleType, SimpleType>
{
  map(input: DgraphSimpleType): SimpleType | Promise<SimpleType> {
    const dgraphSimpleType = DgraphSimpleType.Schema.parse(input)
    const simpleType = new SimpleType()

    simpleType.id = dgraphSimpleType[BaseDgraphFields.uid]
    simpleType.primitiveType =
      dgraphSimpleType[SimpleTypeDgraphFields.PrimitiveType]

    simpleTypeSchema.parse(simpleType)

    return simpleType
  }
}
