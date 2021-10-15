import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphInterfaceType } from '@codelab/backend/infra'
import { TagAdapter } from '@codelab/backend/modules/tag'
import { Injectable } from '@nestjs/common'
import { InterfaceType } from '../../domain'

@Injectable()
export class InterfaceTypeAdapter extends BaseAdapter<
  DgraphInterfaceType,
  InterfaceType
> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, fields, tags }: DgraphInterfaceType) {
    return new InterfaceType({
      id,
      name,
      fields,
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
