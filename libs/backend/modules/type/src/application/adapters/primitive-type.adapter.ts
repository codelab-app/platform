import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphPrimitiveType } from '@codelab/backend/infra'
import { TagAdapter } from '@codelab/backend/modules/tag'
import { Injectable } from '@nestjs/common'
import { PrimitiveType } from '../../domain'

@Injectable()
export class PrimitiveTypeAdapter extends BaseAdapter<
  DgraphPrimitiveType,
  PrimitiveType
> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, primitiveKind, tags }: DgraphPrimitiveType) {
    return new PrimitiveType({
      id,
      name,
      primitiveKind,
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
