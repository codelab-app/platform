import type { IActionTypeModel } from '@codelab/frontend/abstract/domain'
import type { IActionTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name }: IActionTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.ActionType)
  // const decoded = actionTypeValidation.decode({ id, kind, name })

  return new ActionType({ id, kind, name })
}

@model('@codelab/ActionType')
export class ActionType
  extends ExtendedModel(createBaseType(ITypeKind.ActionType), {})
  implements IActionTypeModel
{
  static create = create
}
