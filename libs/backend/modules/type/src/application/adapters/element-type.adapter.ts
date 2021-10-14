import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphElementType } from '@codelab/backend/infra'
import { elementTypeKindMap } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { TagAdapter } from 'libs/backend/modules/tag/src/application/tag.adapter'
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
