import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphComponentType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { TagAdapter } from 'libs/backend/modules/tag/src/application/tag.adapter'
import { ComponentType } from '../../domain'

export type ComponentTypeAdapterInput = DgraphComponentType

@Injectable()
export class ComponentTypeAdapter extends BaseAdapter<
  ComponentTypeAdapterInput,
  ComponentType
> {
  constructor(private readonly tagAdapter: TagAdapter) {
    super()
  }

  mapItem({ uid: id, name, tags }: ComponentTypeAdapterInput) {
    return new ComponentType({
      id,
      name,
      tags: tags?.map((t) => this.tagAdapter.mapItem(t)),
    })
  }
}
