import { BaseDgraphFields, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphTypeFields } from '../dgraph-type.model'
import {
  DgraphSimpleType,
  SimpleTypeDgraphFields,
} from './dgraph-simple-type.model'
import { SimpleType } from './simple-type.model'

@Injectable()
export class SimpleTypeMapper
  implements IDgraphMapper<DgraphSimpleType, SimpleType>
{
  map(input: DgraphSimpleType): SimpleType | Promise<SimpleType> {
    const dgraphSimpleType = DgraphSimpleType.Schema.parse(input)
    const id = dgraphSimpleType[BaseDgraphFields.uid]
    const primitiveType = dgraphSimpleType[SimpleTypeDgraphFields.PrimitiveType]
    const name = dgraphSimpleType[DgraphTypeFields.name]
    const simpleType = new SimpleType(id, name, primitiveType)

    SimpleType.Schema.parse(simpleType)

    return simpleType
  }
}
