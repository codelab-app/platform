import { DgraphArrayType } from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { ArrayType } from '../models'

export type ArrayTypeMapperInput = Omit<DgraphArrayType, 'itemType'>
// export type ArrayTypeMapperInput = Omit<
//   DgraphType<DgraphEntityType.ArrayType>,
//   'itemType'
// >

@Injectable()
export class ArrayTypeMapper
  implements Mapper<ArrayTypeMapperInput, ArrayType>
{
  map({ uid: id, name }: ArrayTypeMapperInput) {
    return new ArrayType(id, name)
  }
}
