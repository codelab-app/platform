import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphInterfaceType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { InterfaceType } from '../../domain'

export type InterfaceTypeAdapterInput = Omit<DgraphInterfaceType, 'fields'>

@Injectable()
export class InterfaceTypeAdapter extends BaseAdapter<
  InterfaceTypeAdapterInput,
  InterfaceType
> {
  mapItem({ uid: id, name }: InterfaceTypeAdapterInput) {
    return new InterfaceType(id, name)
  }
}
