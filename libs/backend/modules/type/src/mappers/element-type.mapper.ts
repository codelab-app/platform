import { DgraphElementType } from '@codelab/backend/infra'
import { ElementTypeKind } from '@codelab/shared/graph'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { ElementType } from '../models'

export type ElementTypeMapperInput = DgraphElementType

@Injectable()
export class ElementTypeMapper
  implements Mapper<ElementTypeMapperInput, ElementType>
{
  map({ uid: id, name, kind }: ElementTypeMapperInput) {
    return new ElementType(id, name, kind as ElementTypeKind)
  }
}
