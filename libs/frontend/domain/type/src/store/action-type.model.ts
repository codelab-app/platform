import type { IActionTypeDto } from '@codelab/shared-abstract-core'

import {
  getActionDomainService,
  type IActionTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { ExpressionSelectField } from '@codelab/frontend-presentation-components-form'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { ExtendedModel, model } from 'mobx-keystone'

import { typedPropSchema } from '../shared'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IActionTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.ActionType)
  // const decoded = actionTypeValidation.decode({ id, kind, name })

  return new ActionType({ id, kind, name, owner: userRef(owner.id) })
}

export const ACTION_TEMPLATE = `{{
  function(event) {
    // To access component props use component.[prop-name]
    /* your code here */
  }
}}`

@model('@codelab/ActionType')
export class ActionType
  extends ExtendedModel(createBaseType(ITypeKind.ActionType), {})
  implements IActionTypeModel
{
  static create = create

  @computed
  get actionDomainService() {
    return getActionDomainService(this)
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    const { providerStore, store } = context
    const options = store
      ? this.actionDomainService.getSelectActionOptions(store, providerStore)
      : []

    return typedPropSchema(
      this,
      {
        component: ExpressionSelectField,
        options,
        defaultExpression: ACTION_TEMPLATE,
      },
      context,
    )
  }
}
