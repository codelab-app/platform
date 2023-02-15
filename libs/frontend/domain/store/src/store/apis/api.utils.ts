//
// Utilities for transforming the form inputs to api inputs
//

import type {
  IAnyAction,
  IAnyActionWhere,
  ICreateActionDTO,
  ICreateActionInput,
  ICreateStoreDTO,
  IUpdateActionDTO,
  IUpdateActionInput,
} from '@codelab/frontend/abstract/core'
import type {
  InterfaceTypeCreateInput,
  StoreCreateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId, connectOwner } from '@codelab/shared/domain/mapper'
import capitalize from 'lodash/capitalize'
import { v4 } from 'uuid'

export const makeStoreCreateInput = (
  input: ICreateStoreDTO,
): StoreCreateInput => {
  const { name, auth0Id } = input

  const interfaceCreateInput: InterfaceTypeCreateInput = {
    id: v4(),
    name: `${capitalize(name)} State`,
    owner: connectOwner(auth0Id),
  }

  return {
    id: v4(),
    name,
    api: { create: { node: interfaceCreateInput } },
  }
}

export const makeActionCreateInput = (
  action: ICreateActionDTO,
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

export const makeActionUpdateInput = (
  action: IAnyAction,
  input: IUpdateActionDTO,
): {
  where: IAnyActionWhere
  update: IUpdateActionInput
} => {
  return {
    where: { id: action.id },
    update: {
      name: input.name,

      resource:
        input.type === IActionKind.ApiAction
          ? connectNodeId(input.resourceId)
          : undefined,

      config:
        input.type === IActionKind.ApiAction
          ? { update: { node: { data: JSON.stringify(input.config) } } }
          : undefined,
      errorAction:
        input.type === IActionKind.ApiAction
          ? {
              ApiAction: connectNodeId(input.errorActionId),
              CodeAction: connectNodeId(input.errorActionId),
            }
          : undefined,
      successAction:
        input.type === IActionKind.ApiAction
          ? {
              ApiAction: connectNodeId(input.successActionId),
              CodeAction: connectNodeId(input.successActionId),
            }
          : undefined,

      code: input.type === IActionKind.CodeAction ? input.code : undefined,
    },
  }
}
