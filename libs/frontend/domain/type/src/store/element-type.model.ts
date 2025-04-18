import type {
  IElementTypeDto,
  IElementTypeKind,
} from '@codelab/shared-abstract-core'

import {
  type IElementTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ elementKind, id, kind, name, owner }: IElementTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.ElementType)

  return new ElementType({
    elementKind,
    id,
    kind,
    name,
    owner: userRef(owner.id),
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

  get toJson() {
    return {
      __typename: this.__typename,
      elementKind: this.elementKind,
      id: this.id,
      kind: this.kind,
      name: this.name,
      owner: this.owner.current.toJson,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }

  @modelAction
  writeCache(elementTypeDto: Partial<IElementTypeDto>) {
    super.writeCache(elementTypeDto)

    this.elementKind = elementTypeDto.elementKind ?? this.elementKind

    return this
  }
}
