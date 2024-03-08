import type {
  IActionFactory,
  IActionModel,
} from '@codelab/frontend/abstract/domain'
import {
  ActionFragment,
  ApiActionFragment,
  CodeActionFragment,
} from '@codelab/shared/abstract/codegen'
import {
  IActionDto,
  IActionKind,
  IApiActionDto,
  ICodeActionDto,
} from '@codelab/shared/abstract/core'
import { ActionMapper } from '@codelab/shared/domain'
import { Model, model, modelAction } from 'mobx-keystone'

const writeCache = (
  actionDTO: IActionDto,
  action: IActionModel,
): IActionModel => {
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

@model('@codelab/ActionFactory')
export class ActionFactory extends Model({}) implements IActionFactory {
  static mapActionToDto(action: IActionModel): IActionDto {
    switch (action.type) {
      case IActionKind.CodeAction:
        return {
          __typename: IActionKind.CodeAction,
          code: action.code,
          id: action.id,
          name: action.name,
          store: { id: action.store.id },
        }

      case IActionKind.ApiAction:
        return {
          __typename: IActionKind.ApiAction,
          config: {
            data: JSON.stringify(action.config.data),
            id: action.config.id,
          },
          errorAction: action.errorAction
            ? { __typename: IActionKind.ApiAction, id: action.errorAction.id }
            : undefined,
          id: action.id,
          name: action.name,
          resource: { id: action.resource.id },
          store: { id: action.store.id },
          successAction: action.successAction
            ? { __typename: IActionKind.ApiAction, id: action.successAction.id }
            : undefined,
        }
    }
  }

  static mapDataToDto = ActionMapper.mapDataToDto

  static writeCache = writeCache

  @modelAction
  fromActionFragment(actionFragment: ActionFragment): IActionDto {
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
    config,
    errorAction,
    successAction,
    ...apiActionFragment
  }: ApiActionFragment): IApiActionDto {
    return {
      ...apiActionFragment,
      config,
      errorAction: errorAction
        ? { __typename: IActionKind.ApiAction, id: errorAction.id }
        : undefined,
      successAction: successAction
        ? { __typename: IActionKind.ApiAction, id: successAction.id }
        : undefined,
    }
  }

  @modelAction
  private fromCodeActionFragment(
    codeAction: CodeActionFragment,
  ): ICodeActionDto {
    return codeAction
  }
}
