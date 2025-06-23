import type {
  IActionDto,
  IApiActionDto,
  ICodeActionDto,
  ICreateActionData,
} from '@codelab/shared-abstract-core'
import type {
  ActionFragment,
  ApiActionFragment,
  CodeActionFragment,
} from '@codelab/shared-infra-gqlgen'

import { IActionKind } from '@codelab/shared-abstract-core'

export const actionFactory = {
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
  },
  fromApiActionFragment: ({
    config,
    errorAction,
    successAction,
    ...apiActionFragment
  }: ApiActionFragment): IApiActionDto => {
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
  },

  fromCodeActionFragment: (codeAction: CodeActionFragment): ICodeActionDto => {
    return codeAction
  },

  mapDataToDto: (data: ICreateActionData): IActionDto => {
    switch (data.type) {
      case IActionKind.ApiAction:
        return {
          ...data,
          __typename: IActionKind.ApiAction,
          config: { data: JSON.stringify(data.config.data), id: data.id },
          errorAction: data.errorAction?.id
            ? { __typename: IActionKind.ApiAction, id: data.errorAction.id }
            : undefined,
          resource: { id: data.resource.id },
          store: { id: data.store.id },
          successAction: data.successAction?.id
            ? { __typename: IActionKind.ApiAction, id: data.successAction.id }
            : undefined,
        }

      case IActionKind.CodeAction:
        return {
          ...data,
          __typename: IActionKind.CodeAction,
          store: { id: data.store.id },
        }

      default:
        throw new Error(`Unknown action type : ${data.type}`)
    }
  },

  // writeCache: (actionDto: IActionDto, action: IActionModel): IActionModel => {
  //   switch (actionDto.__typename) {
  //     case IActionKind.CodeAction:
  //       action.type === IActionKind.CodeAction && action.writeCache(actionDto)

  //       return action

  //     case IActionKind.ApiAction:
  //       if (action.type === IActionKind.ApiAction) {
  //         action.writeCache(actionDto)
  //       }

  //       return action

  //     default:
  //       throw new Error(`Unknown action type : ${actionDto.__typename}`)
  //   }
  // },
}
