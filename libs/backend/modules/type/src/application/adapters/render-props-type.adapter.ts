import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphReactNodeType } from '@codelab/backend/infra'
import { TagAdapter } from '@codelab/backend/modules/tag'
import { Injectable } from '@nestjs/common'
import { RenderPropsType } from '../../domain/types/render-props-type.model'

@Injectable()
export class RenderPropsAdapter extends BaseAdapter<any, RenderPropsType> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, tags }: DgraphReactNodeType) {
    return new RenderPropsType({
      id,
      name,
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
