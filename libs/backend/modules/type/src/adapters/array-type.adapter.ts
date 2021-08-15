import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphArrayType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { ArrayType } from '../models'

export type ArrayTypeAdapterInput = Omit<DgraphArrayType, 'itemType'>

@Injectable()
export class ArrayTypeAdapter extends BaseAdapter<
  ArrayTypeAdapterInput,
  ArrayType
> {
  mapItem({ uid: id, name }: ArrayTypeAdapterInput) {
    return new ArrayType(id, name)
  }
}
