import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphLambdaType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { LambdaType } from '../../domain'
import { TagAdapter } from '@codelab/backend/modules/tag'

export type LambdaTypeAdapterInput = DgraphLambdaType

@Injectable()
export class LambdaTypeAdapter extends BaseAdapter<
  LambdaTypeAdapterInput,
  LambdaType
> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, tags }: LambdaTypeAdapterInput) {
    return new LambdaType({
      id,
      name,
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
