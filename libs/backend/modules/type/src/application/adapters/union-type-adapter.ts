import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphUnionType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { UnionType } from '../../domain/types/union-type.model'

@Injectable()
export class UnionTypeAdapter extends BaseAdapter<
  DgraphUnionType,
  Promise<UnionType>
> {
  async mapItem({ name, uid: id, typesOfUnionType = [] }: DgraphUnionType) {
    return new UnionType({
      id,
      name,
      typeIdsOfUnionType: typesOfUnionType.map((t) => t.uid),
    })
  }
}
