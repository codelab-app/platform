import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphUnionType } from '@codelab/backend/infra'
import { TagAdapter } from '@codelab/backend/modules/tag'
import { Injectable } from '@nestjs/common'
import { UnionType } from '../../domain/types/union-type.model'

@Injectable()
export class UnionTypeAdapter extends BaseAdapter<
  DgraphUnionType,
  Promise<UnionType>
> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  async mapItem({
    name,
    uid: id,
    typesOfUnionType = [],
    tags,
  }: DgraphUnionType) {
    return new UnionType({
      id,
      name,
      typeIdsOfUnionType: typesOfUnionType.map((t) => t.uid),
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
