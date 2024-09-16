import type {
  IRichTextTypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import type { IRichTextTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name }: IRichTextTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.RichTextType)

  return new RichTextType({
    id,
    kind,
    name,
  })
}

@model('@codelab/RichTextType')
export class RichTextType
  extends ExtendedModel(createBaseType(ITypeKind.RichTextType), {})
  implements IRichTextTypeModel
{
  public static create = create

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }
}
