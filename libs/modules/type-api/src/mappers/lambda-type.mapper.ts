import { DgraphLambdaType, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { LambdaType } from '../models'

export type LambdaTypeMapperInput = DgraphLambdaType

@Injectable()
export class LambdaTypeMapper
  implements Mapper<LambdaTypeMapperInput, LambdaType>
{
  map({ uid: id, name }: LambdaTypeMapperInput) {
    return new LambdaType(id, name)
  }
}
