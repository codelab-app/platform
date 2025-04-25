import type {
  IAppTypeDto,
  IRichTextTypeDto,
} from '@codelab/shared-abstract-core'

import {
  type IRichTextTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IRichTextTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.RichTextType)

  return new RichTextType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/RichTextType')
export class RichTextType
  extends ExtendedModel(createBaseType(ITypeKind.RichTextType), {})
  implements IRichTextTypeModel
{
  public static create = create

  @computed
  get toJson(): IRichTextTypeDto {
    return {
      ...super.toJson,
      __typename: this.__typename,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }

  @modelAction
  writeCache({ name }: Partial<IRichTextTypeDto>): IRichTextTypeModel {
    this.name = name ?? this.name

    return this
  }
}
