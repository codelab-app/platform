import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphComponentType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { ComponentType } from '../models'

export type ComponentTypeAdapterInput = DgraphComponentType

@Injectable()
export class ComponentTypeAdapter extends BaseAdapter<
  ComponentTypeAdapterInput,
  ComponentType
> {
  mapSingle({ uid: id, name }: ComponentTypeAdapterInput) {
    return new ComponentType(id, name)
  }
}
