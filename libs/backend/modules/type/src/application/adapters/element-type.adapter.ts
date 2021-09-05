import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphElementType } from '@codelab/backend/infra'
import { elementTypeKindMap } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { ElementType } from '../../domain'

export type ElementTypeAdapterInput = DgraphElementType

@Injectable()
export class ElementTypeAdapter extends BaseAdapter<
  ElementTypeAdapterInput,
  ElementType
> {
  mapItem({ uid: id, name, kind }: ElementTypeAdapterInput) {
    return new ElementType({ id, name, kind: elementTypeKindMap(kind) })
  }
}
