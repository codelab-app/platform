import { DgraphLambdaType } from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
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
