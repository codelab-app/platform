//
// Utilities for transforming the form inputs to api inputs
//

import {
  InterfaceTypeCreateInput,
  StoreCreateInput,
} from '@codelab/shared/abstract/codegen'
import {
  IActionKind,
  IAnyAction,
  IAnyActionWhere,
  ICreateActionDTO,
  ICreateActionInput,
  ICreateStoreDTO,
  IUpdateActionDTO,
  IUpdateActionInput,
} from '@codelab/shared/abstract/core'
import { connectNode, connectTypeOwner } from '@codelab/shared/data'
import capitalize from 'lodash/capitalize'
import { v4 } from 'uuid'

export const makeStoreCreateInput = (
  input: ICreateStoreDTO,
): StoreCreateInput => {
  const { name, auth0Id } = input

  const interfaceCreateInput: InterfaceTypeCreateInput = {
    id: v4(),
    name: `${capitalize(name)} State`,
    owner: connectTypeOwner(auth0Id),
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
    store: connectNode(action.storeId),

    code: action.type === IActionKind.CodeAction ? action.code : undefined,

    config:
      action.type === IActionKind.ApiAction
        ? { create: { node: { data: JSON.stringify(action.config || {}) } } }
        : undefined,

    resource:
      action.type === IActionKind.ApiAction
        ? connectNode(action.resourceId)
        : undefined,

    errorAction:
      action.type === IActionKind.ApiAction && action.errorActionId
        ? {
            ApiAction: connectNode(action.errorActionId),
            CodeAction: connectNode(action.errorActionId),
          }
        : undefined,

    successAction:
      action.type === IActionKind.ApiAction && action.successActionId
        ? {
            ApiAction: connectNode(action.successActionId),
            CodeAction: connectNode(action.successActionId),
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
          ? connectNode(input.resourceId)
          : undefined,

      config:
        input.type === IActionKind.ApiAction
          ? { update: { node: { data: JSON.stringify(input.config) } } }
          : undefined,
      errorAction:
        input.type === IActionKind.ApiAction
          ? {
              ApiAction: connectNode(input.errorActionId),
              CodeAction: connectNode(input.errorActionId),
            }
          : undefined,
      successAction:
        input.type === IActionKind.ApiAction
          ? {
              ApiAction: connectNode(input.successActionId),
              CodeAction: connectNode(input.successActionId),
            }
          : undefined,

      code: input.type === IActionKind.CodeAction ? input.code : undefined,
    },
  }
}
