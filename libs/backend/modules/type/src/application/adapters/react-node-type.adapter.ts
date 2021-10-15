import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphReactNodeType } from '@codelab/backend/infra'
import { TagAdapter } from '@codelab/backend/modules/tag'
import { Injectable } from '@nestjs/common'
import { ReactNodeType } from '../../domain/types/react-node-type.model'

@Injectable()
export class ReactNodeAdapter extends BaseAdapter<any, ReactNodeType> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, tags }: DgraphReactNodeType) {
    return new ReactNodeType({
      id,
      name,
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
