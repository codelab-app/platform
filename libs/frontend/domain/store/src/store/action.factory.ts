import type {
  IAction,
  IActionFactory,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/frontend/abstract/core'
import {
  IActionDTO,
  IApiActionDTO,
  ICodeActionDTO,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import {
  ActionFragment,
  ApiActionFragment,
  CodeActionFragment,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction } from 'mobx-keystone'

@model('@codelab/ActionFactory')
export class ActionFactory extends Model({}) implements IActionFactory {
  @computed
  get propService() {
    return getPropService(this)
  }

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
    errorAction,
    successAction,
    ...apiActionFragment
  }: ApiActionFragment): IApiActionDTO {
    return {
      ...apiActionFragment,
      errorAction: errorAction
        ? this.fromActionFragment(errorAction as ActionFragment)
        : undefined,
      successAction: successAction
        ? this.fromActionFragment(successAction as ActionFragment)
        : undefined,
    }
  }

  @modelAction
  private fromCodeActionFragment(
    codeAction: CodeActionFragment,
  ): ICodeActionDTO {
    return codeAction
  }

  static writeCache(actionDTO: IActionDTO, action: IAction): IAction {
    switch (actionDTO.__typename) {
      case IActionKind.CodeAction:
        action.type === IActionKind.CodeAction && action.writeCache(actionDTO)

        return action

      case IActionKind.ApiAction:
        if (action.type === IActionKind.ApiAction) {
          action.writeCache(actionDTO)
        }

        return action

      default:
        throw new Error(`Unknown action type : ${actionDTO.__typename}`)
    }
  }

  static mapDataToDTO(data: ICreateActionData | IUpdateActionData): IActionDTO {
    switch (data.type) {
      case IActionKind.CodeAction:
        return {
          ...data,
          __typename: IActionKind.CodeAction,
          store: { id: data.storeId },
        }

      case IActionKind.ApiAction:
        return {
          ...data,
          __typename: IActionKind.ApiAction,
          config: { id: data.config.id },
          errorAction: data.errorActionId
            ? { id: data.errorActionId }
            : undefined,
          resource: { id: data.resourceId },
          store: { id: data.storeId },
          successAction: data.successActionId
            ? { id: data.successActionId }
            : undefined,
        }
    }
  }
}
