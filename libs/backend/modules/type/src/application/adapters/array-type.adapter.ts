import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphArrayType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { ArrayType } from '../../domain'

export type ArrayTypeAdapterInput = Pick<DgraphArrayType, 'uid' | 'name'>

@Injectable()
export class ArrayTypeAdapter extends BaseAdapter<
  ArrayTypeAdapterInput,
  ArrayType
> {
  mapItem({ uid: id, name }: ArrayTypeAdapterInput) {
    return new ArrayType({ id, name })
  }
}
