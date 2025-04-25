import type { IRenderPropTypeDto } from '@codelab/shared-abstract-core'

import {
  type IRenderPropTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IRenderPropTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.RenderPropType)

  return new RenderPropType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/RenderPropType')
export class RenderPropType
  extends ExtendedModel(createBaseType(ITypeKind.RenderPropType), {})
  implements IRenderPropTypeModel
{
  public static create = create

  @computed
  get toJson(): IRenderPropTypeDto {
    return {
      ...super.toJson,
      __typename: this.__typename,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }

  @modelAction
  writeCache({ name }: Partial<IRenderPropTypeDto>): IRenderPropTypeModel {
    this.name = name ?? this.name

    return this
  }
}
