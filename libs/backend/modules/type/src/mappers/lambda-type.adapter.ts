import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphLambdaType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { LambdaType } from '../models'

export type LambdaTypeAdapterInput = DgraphLambdaType

@Injectable()
export class LambdaTypeAdapter extends BaseAdapter<
  LambdaTypeAdapterInput,
  LambdaType
> {
  mapSingle({ uid: id, name }: LambdaTypeAdapterInput) {
    return new LambdaType(id, name)
  }
}
