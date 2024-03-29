import type { IAppTypeModel } from '@codelab/frontend/abstract/domain'
import type { IAppTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name }: IAppTypeDto): AppType => {
  assertIsTypeKind(kind, ITypeKind.AppType)

  return new AppType({
    id,
    kind,
    name,
  })
}

@model('@codelab/AppType')
export class AppType
  extends ExtendedModel(createBaseType(ITypeKind.AppType), {})
  implements IAppTypeModel
{
  public static create = create
}
