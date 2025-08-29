import type { ILambdaTypeDto } from '@codelab/shared-abstract-core'

import {
  type ILambdaTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { ExpressionListField } from '@codelab/frontend-presentation-components-form'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model } from 'mobx-keystone'

import { typedPropSchema } from '../shared'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: ILambdaTypeDto): LambdaType => {
  assertIsTypeKind(kind, ITypeKind.LambdaType)

  return new LambdaType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(createBaseType(ITypeKind.LambdaType), {})
  implements ILambdaTypeModel
{
  public static create = create

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(
      this,
      {
        options: [],
        component: ExpressionListField,
      },
      context,
    )
  }
}
