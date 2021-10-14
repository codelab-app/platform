import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphElementType } from '@codelab/backend/infra'
import { TagAdapter } from '@codelab/backend/modules/tag'
import { elementTypeKindMap } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { ElementType } from '../../domain'

export type ElementTypeAdapterInput = DgraphElementType

@Injectable()
export class ElementTypeAdapter extends BaseAdapter<
  ElementTypeAdapterInput,
  ElementType
> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, kind, tags }: ElementTypeAdapterInput) {
    return new ElementType({
      id,
      name,
      kind: elementTypeKindMap(kind),
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
