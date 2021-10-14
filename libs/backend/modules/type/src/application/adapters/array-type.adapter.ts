import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphArrayType } from '@codelab/backend/infra'
import { TagAdapter } from '@codelab/backend/modules/tag'
import { Injectable } from '@nestjs/common'
import { ArrayType } from '../../domain'

export type ArrayTypeAdapterInput = Pick<
  DgraphArrayType,
  'uid' | 'name' | 'tags'
>

@Injectable()
export class ArrayTypeAdapter extends BaseAdapter<
  ArrayTypeAdapterInput,
  ArrayType
> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, tags }: ArrayTypeAdapterInput) {
    return new ArrayType({
      id,
      name,
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
