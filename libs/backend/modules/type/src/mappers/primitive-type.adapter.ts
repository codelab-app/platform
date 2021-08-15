import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphPrimitiveType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { PrimitiveType } from '../models'

@Injectable()
export class PrimitiveTypeAdapter extends BaseAdapter<
  DgraphPrimitiveType,
  PrimitiveType
> {
  mapSingle({ uid: id, name, primitiveKind }: DgraphPrimitiveType) {
    return new PrimitiveType(id, name, primitiveKind)
  }
}
