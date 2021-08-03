import { DgraphPrimitiveType, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { PrimitiveType } from '../models'

@Injectable()
export class PrimitiveTypeMapper
  implements Mapper<DgraphPrimitiveType, PrimitiveType>
{
  map({ uid: id, name, primitiveKind }: DgraphPrimitiveType) {
    return new PrimitiveType(id, name, primitiveKind)
  }
}
