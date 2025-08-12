import type { IActionTypeDto } from '@codelab/shared-abstract-core'

import { getRendererService } from '@codelab/frontend-abstract-application'
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

const ACTION_TEMPLATE = `{{
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

  @computed
  get renderer() {
    const activeRenderer = this.rendererService.activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get rendererService() {
    return getRendererService(this)
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    const { runtimeContainerNode, runtimeRootContainerNode } = this.renderer
    const runtimeStore = runtimeContainerNode.runtimeStore
    const runtimeProviderStore = runtimeRootContainerNode.current.runtimeStore

    return typedPropSchema(
      this,
      {
        component: ExpressionSelectField,
        options: this.actionDomainService.getSelectActionOptions(
          runtimeStore.store.current,
          runtimeProviderStore.store.current,
        ),
        defaultExpression: ACTION_TEMPLATE,
      },
      context,
    )
  }
}
