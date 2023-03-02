//
// Utilities for transforming the form inputs to api inputs
//

import type {
  IAnyAction,
  IAnyActionWhere,
  ICreateActionData,
  ICreateActionInput,
  ICreateStoreData,
  IStoreDTO,
  IUpdateActionData,
  IUpdateActionInput,
} from '@codelab/frontend/abstract/core'
import type {
  InterfaceTypeCreateInput,
  StoreCreateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import capitalize from 'lodash/capitalize'
import { v4 } from 'uuid'

export const makeStoreCreateInput = ({
  name,
  owner,
}: ICreateStoreData): StoreCreateInput => {
  const interfaceCreateInput: InterfaceTypeCreateInput = {
    id: v4(),
    name: `${capitalize(name)} State`,
    owner: connectAuth0Owner(owner),
  }

  return {
    id: v4(),
    name,
    api: { create: { node: interfaceCreateInput } },
  }
}

export const makeActionCreateInput = (
  action: ICreateActionData,
): ICreateActionInput => {
  return {
    id: v4(),
    name: action.name,
    type: action.type,
    store: connectNodeId(action.storeId),

    code: action.type === IActionKind.CodeAction ? action.code : undefined,

    config:
      action.type === IActionKind.ApiAction
        ? { create: { node: { data: JSON.stringify(action.config || {}) } } }
        : undefined,

    resource:
      action.type === IActionKind.ApiAction
        ? connectNodeId(action.resourceId)
        : undefined,

    errorAction:
      action.type === IActionKind.ApiAction && action.errorActionId
        ? {
            ApiAction: connectNodeId(action.errorActionId),
            CodeAction: connectNodeId(action.errorActionId),
          }
        : undefined,

    successAction:
      action.type === IActionKind.ApiAction && action.successActionId
        ? {
            ApiAction: connectNodeId(action.successActionId),
            CodeAction: connectNodeId(action.successActionId),
          }
        : undefined,
  }
}

export const makeActionUpdateInput = ({
  id,
  name,
  type,
  resourceId,
  config,
  errorActionId,
  successActionId,
  code,
}: IUpdateActionData): {
  where: IAnyActionWhere
  update: IUpdateActionInput
} => {
  return {
    where: { id },
    update: {
      name: name,

      resource:
        type === IActionKind.ApiAction ? connectNodeId(resourceId) : undefined,

      config:
        type === IActionKind.ApiAction
          ? { update: { node: { data: JSON.stringify(config) } } }
          : undefined,
      errorAction:
        type === IActionKind.ApiAction
          ? {
              ApiAction: connectNodeId(errorActionId),
              CodeAction: connectNodeId(errorActionId),
            }
          : undefined,
      successAction:
        type === IActionKind.ApiAction
          ? {
              ApiAction: connectNodeId(successActionId),
              CodeAction: connectNodeId(successActionId),
            }
          : undefined,

      code: type === IActionKind.CodeAction ? code : undefined,
    },
  }
}
