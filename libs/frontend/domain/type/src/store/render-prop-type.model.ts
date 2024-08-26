import type {
  IRenderPropTypeModel,
  JsonSchema,
  TransformContext,
} from '@codelab/frontend/abstract/domain'
import type { IRenderPropTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name }: IRenderPropTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.RenderPropType)

  return new RenderPropType({
    id,
    kind,
    name,
  })
}

@model('@codelab/RenderPropType')
export class RenderPropType
  extends ExtendedModel(createBaseType(ITypeKind.RenderPropType), {})
  implements IRenderPropTypeModel
{
  public static create = create

  toJsonSchema(context: TransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }
}
