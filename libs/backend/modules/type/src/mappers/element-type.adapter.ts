import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphElementType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { ElementType, ElementTypeKind } from '../models'

export type ElementTypeAdapterInput = DgraphElementType

@Injectable()
export class ElementTypeAdapter extends BaseAdapter<
  ElementTypeAdapterInput,
  ElementType
> {
  mapSingle({ uid: id, name, kind }: ElementTypeAdapterInput) {
    return new ElementType(id, name, kind as ElementTypeKind)
  }
}
