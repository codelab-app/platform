import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphPrimitiveType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { PrimitiveType } from '../../domain'

@Injectable()
export class PrimitiveTypeAdapter extends BaseAdapter<
  DgraphPrimitiveType,
  PrimitiveType
> {
  mapItem({ uid: id, name, primitiveKind }: DgraphPrimitiveType) {
    return new PrimitiveType(id, name, primitiveKind)
  }
}
