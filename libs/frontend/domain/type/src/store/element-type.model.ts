import type {
  IElementTypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import type {
  IElementTypeDto,
  IElementTypeKind,
} from '@codelab/shared/abstract/core'

import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { mergeDeep } from 'remeda'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ elementKind, id, kind, name }: IElementTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.ElementType)

  return new ElementType({
    elementKind,
    id,
    kind,
    name,
  })
}

@model('@codelab/ElementType')
export class ElementType
  extends ExtendedModel(createBaseType(ITypeKind.ElementType), {
    elementKind: prop<IElementTypeKind>(),
  })
  implements IElementTypeModel
{
  public static create = create

  @modelAction
  writeCache(elementTypeDto: Partial<IElementTypeDto>) {
    super.writeCache(elementTypeDto)

    this.elementKind = elementTypeDto.elementKind ?? this.elementKind

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      elementKind: this.elementKind,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }

  toUpdateInput() {
    return mergeDeep(
      {
        ...super.toUpdateInput(),
        update: {
          elementKind: this.elementKind,
        },
      },
      super.toUpdateInput(),
    )
  }
}
