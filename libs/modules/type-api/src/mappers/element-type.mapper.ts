import { DgraphElementType, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { ElementType, ElementTypeKind } from '../models'

export type ElementTypeMapperInput = DgraphElementType

@Injectable()
export class ElementTypeMapper
  implements Mapper<ElementTypeMapperInput, ElementType>
{
  map({ uid: id, name, kind }: ElementTypeMapperInput) {
    return new ElementType(id, name, kind as ElementTypeKind)
  }
}
