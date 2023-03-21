import type { IActionFactory } from '@codelab/frontend/abstract/core'
import {
  IActionDTO,
  IApiActionData,
  IApiActionDTO,
  ICodeActionData,
  ICodeActionDTO,
  ICreateActionData,
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

  @modelAction
  fromActionData(data: ICreateActionData): IActionDTO {
    switch (data.type) {
      case IActionKind.ApiAction: {
        return this.fromApiActionData(data)
      }

      case IActionKind.CodeAction: {
        return this.fromCodeActionData(data)
      }

      default: {
        throw new Error('Unknown action found')
      }
    }
  }

  @modelAction
  private fromApiActionData({
    config: configData,
    errorActionId,
    id,
    name,
    resourceId,
    storeId,
    successActionId,
  }: IApiActionData): IApiActionDTO {
    return {
      __typename: IActionKind.ApiAction,
      config: { id: configData.id },
      errorAction: errorActionId ? { id: errorActionId } : undefined,
      id: id,
      name: name,
      resource: { id: resourceId },
      store: { id: storeId },
      successAction: successActionId ? { id: successActionId } : undefined,
    }
  }

  @modelAction
  private fromCodeActionData({
    code,
    id,
    name,
    storeId,
  }: ICodeActionData): ICodeActionDTO {
    return {
      __typename: IActionKind.CodeAction,
      code,
      id: id,
      name: name,
      store: { id: storeId },
    }
  }
}
