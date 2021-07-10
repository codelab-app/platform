import { BaseDgraphFields, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphTypeFields } from '../dgraph-type.model'
import {
  DgraphPrimitiveType,
  PrimitiveTypeFields,
} from './dgraph-primitive-type.model'
import { PrimitiveType } from './primitive-type.model'

@Injectable()
export class PrimitiveTypeMapper
  implements IDgraphMapper<DgraphPrimitiveType, PrimitiveType>
{
  map(input: DgraphPrimitiveType): PrimitiveType | Promise<PrimitiveType> {
    DgraphPrimitiveType.Schema.parse(input)

    const id = input[BaseDgraphFields.uid]
    const kind = input[PrimitiveTypeFields.Kind]
    const name = input[DgraphTypeFields.name]
    const primitiveType = new PrimitiveType(id, name, kind)

    PrimitiveType.Schema.parse(primitiveType)

    return primitiveType
  }
}
