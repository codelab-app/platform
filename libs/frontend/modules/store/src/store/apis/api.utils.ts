//
// Utilities for transforming the form inputs to api inputs
//

import {
  InterfaceTypeCreateInput,
  StoreCreateInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import {
  IActionKind,
  IAnyAction,
  IAnyActionWhere,
  ICreateActionDTO,
  ICreateStoreDTO,
  IUpdateActionDTO,
  IUpdateActionInput,
  IUpdateStoreDTO,
} from '@codelab/shared/abstract/core'
import { capitalize, difference } from 'lodash'
import { v4 } from 'uuid'

export const makeStoreCreateInput = (
  input: ICreateStoreDTO,
): StoreCreateInput => {
  const { name, auth0Id } = input

  const interfaceCreateInput: InterfaceTypeCreateInput = {
    id: v4(),
    name: `${capitalize(name)} State`,
    owner: {
      connect: { where: { node: { auth0Id } } },
    },
  }

  return {
    id: v4(),
    name,
    state: { create: { node: { data: '{}' } } },
    stateApi: { create: { node: interfaceCreateInput } },
  }
}

export const makeStoreUpdateInput = (
  input: IUpdateStoreDTO,
): StoreUpdateInput => {
  const { name, state } = input

  return {
    name,
    state: { update: { node: { data: state } }, where: {} },
  }
}

export const makeCreateUpdateInput = (action: ICreateActionDTO) => ({
  id: v4(),
  name: action.name,
  runOnInit: action.runOnInit,
  type: action.type,
  store: { connect: { where: { node: { id: action.storeId } } } },

  code: action.type === IActionKind.CustomAction ? action.code : undefined,

  config:
    action.type === IActionKind.ResourceAction
      ? { create: { node: { data: JSON.stringify(action.config || {}) } } }
      : undefined,

  resource:
    action.type === IActionKind.ResourceAction
      ? { connect: { where: { node: { id: action.resourceId } } } }
      : undefined,

  error:
    action.type === IActionKind.ResourceAction && action.errorId
      ? { connect: { where: { node: { id: action.errorId } } } }
      : undefined,

  success:
    action.type === IActionKind.ResourceAction && action.successId
      ? { connect: { where: { node: { id: action.successId } } } }
      : undefined,

  actions:
    action.type === IActionKind.PipelineAction && action.actionsIds
      ? {
          connect: action.actionsIds?.map((id) => ({
            where: { node: { id } },
          })),
        }
      : undefined,
})

export const makeActionUpdateInput = (
  action: IAnyAction,
  input: IUpdateActionDTO,
): {
  where: IAnyActionWhere
  update: IUpdateActionInput
} => {
  const previousIds =
    action.type === IActionKind.PipelineAction
      ? action.actions?.map((a) => a.id)
      : []

  const newIds = input.actionsIds || []
  const removedId = difference(previousIds, newIds)
  const addedId = difference(newIds, previousIds)

  const connect = addedId.length
    ? [{ where: { node: { id_IN: addedId } } }]
    : undefined

  const disconnect = removedId.length
    ? [{ where: { node: { id_IN: removedId } } }]
    : undefined

  return {
    where: { id: action.id },
    update: {
      name: input.name,
      runOnInit: input.runOnInit,

      resource:
        input.type === IActionKind.ResourceAction
          ? {
              connect: { where: { node: { id: input.resourceId } } },
            }
          : undefined,

      config:
        input.type === IActionKind.ResourceAction
          ? { update: { node: { data: JSON.stringify(input.config) } } }
          : undefined,
      error:
        input.type === IActionKind.ResourceAction
          ? { connect: { where: { node: { id: input.errorId } } } }
          : undefined,
      success:
        input.type === IActionKind.ResourceAction
          ? { connect: { where: { node: { id: input.successId } } } }
          : undefined,

      actions: [{ disconnect, connect }],

      code: input.type === IActionKind.CustomAction ? input.code : undefined,
    },
  }
}

/* [
      {
        disconnect: [{ where: {} }],
        connect: [{ where: { node: { id_IN: input.actionsIds } } }] ?? [],
      },
    ] */
