import { DgraphPrimitiveType } from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
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
