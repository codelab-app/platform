import type { IActionFactory } from '@codelab/frontend/abstract/core'
import {
  IActionDTO,
  IApiActionDTO,
  ICodeActionDTO,
} from '@codelab/frontend/abstract/core'
import {
  ActionFragment,
  ApiActionFragment,
  CodeActionFragment,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { Model, model, modelAction } from 'mobx-keystone'

@model('@codelab/ActionFactory')
export class ActionFactory extends Model({}) implements IActionFactory {
  @modelAction
  fromActionFragment(actionFragment: ActionFragment): IActionDTO {
    switch (actionFragment.__typename) {
      case IActionKind.ApiAction: {
        return this.fromApiActionFragment(actionFragment)
      }

      case IActionKind.CodeAction: {
        return this.fromCodeActionFragment(actionFragment)
      }

      default: {
        throw new Error('No action found')
      }
    }
  }

  @modelAction
  private fromApiActionFragment({
    successAction,
    errorAction,
    resource,
    config,
    ...apiActionFragment
  }: ApiActionFragment): IApiActionDTO {
    return {
      ...apiActionFragment,
      config: {
        data: JSON.parse(config.data),
        id: config.id,
      },
      errorAction: errorAction
        ? this.fromActionFragment(errorAction as ActionFragment)
        : undefined,
      resource: {
        ...resource,
        config: JSON.parse(resource.config.data),
      },
      successAction: successAction
        ? this.fromActionFragment(successAction as ActionFragment)
        : undefined,
    }
  }

  @modelAction
  private fromCodeActionFragment({
    ...codeAction
  }: CodeActionFragment): ICodeActionDTO {
    return {
      ...codeAction,
    }
  }
}
