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
import { connectTypeOwner } from '@codelab/shared/data'
import { capitalize } from 'lodash'
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
    store: { connect: { where: { node: { id: action.storeId } } } },

    code: action.type === IActionKind.CodeAction ? action.code : undefined,

    config:
      action.type === IActionKind.ApiAction
        ? { create: { node: { data: JSON.stringify(action.config || {}) } } }
        : undefined,

    resource:
      action.type === IActionKind.ApiAction
        ? { connect: { where: { node: { id: action.resourceId } } } }
        : undefined,

    errorAction:
      action.type === IActionKind.ApiAction && action.errorActionId
        ? {
            ApiAction: {
              connect: { where: { node: { id: action.errorActionId } } },
            },
          }
        : undefined,

    successAction:
      action.type === IActionKind.ApiAction && action.successActionId
        ? {
            ApiAction: {
              connect: { where: { node: { id: action.successActionId } } },
            },
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
          ? { connect: { where: { node: { id: input.resourceId } } } }
          : undefined,

      config:
        input.type === IActionKind.ApiAction
          ? { update: { node: { data: JSON.stringify(input.config) } } }
          : undefined,
      errorAction:
        input.type === IActionKind.ApiAction
          ? {
              ApiAction: {
                connect: { where: { node: { id: input.errorActionId } } },
              },
            }
          : undefined,
      successAction:
        input.type === IActionKind.ApiAction
          ? {
              ApiAction: {
                connect: { where: { node: { id: input.successActionId } } },
              },
            }
          : undefined,

      code: input.type === IActionKind.CodeAction ? input.code : undefined,
    },
  }
}
