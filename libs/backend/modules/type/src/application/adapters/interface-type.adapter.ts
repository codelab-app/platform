import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphInterfaceType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { InterfaceType } from '../../domain'

@Injectable()
export class InterfaceTypeAdapter extends BaseAdapter<
  DgraphInterfaceType,
  InterfaceType
> {
  mapItem({ uid: id, name, fields }: DgraphInterfaceType) {
    return new InterfaceType({ id, name, fields })
  }
}
