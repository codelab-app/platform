import type { ILambdaTypeModel } from '@codelab/frontend/abstract/domain'
import type { ILambdaTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name }: ILambdaTypeDto): LambdaType => {
  assertIsTypeKind(kind, ITypeKind.LambdaType)

  return new LambdaType({
    id,
    kind,
    name,
  })
}

@model('@codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(createBaseType(ITypeKind.LambdaType), {})
  implements ILambdaTypeModel
{
  public static create = create
}
