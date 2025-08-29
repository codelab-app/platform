import type { IRichTextTypeDto } from '@codelab/shared-abstract-core'

import {
  type IRichTextTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { RichTextField } from '@codelab/frontend-presentation-components-form'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model } from 'mobx-keystone'

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

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, { component: RichTextField }, context)
  }
}
