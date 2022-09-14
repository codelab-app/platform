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
  ICreateActionInput,
  ICreateStoreDTO,
  IUpdateActionDTO,
  IUpdateActionInput,
  IUpdateStoreDTO,
} from '@codelab/shared/abstract/core'
import { connectTypeOwner } from '@codelab/shared/data'
import { capitalize, keys } from 'lodash'
import { v4 } from 'uuid'

interface ActionsOrders {
  [key: string]: Array<string>
}

const makePipelineActionsUpdateInput = (actionsOrders: ActionsOrders) => [
  {
    disconnect: [{ where: {} }],
    connect: keys(actionsOrders).map((id) => ({
      where: { node: { id } },
      edge: { orders: actionsOrders[id] },
    })),
  },
]

const makePipelineActionsCreateInput = (actionsOrders: ActionsOrders) => ({
  connect: keys(actionsOrders).map((id) => ({
    where: { node: { id } },
    edge: { orders: actionsOrders[id] },
  })),
})

const groupActionsOrders = (actionsIds: Array<string>) =>
  actionsIds.reduce(
    (all, current, index) => ({
      ...all,
      [current]: [String(index)].concat(all[current] || []),
    }),
    {} as ActionsOrders,
  )

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
    state: { create: { node: { data: '{}' } } },
    api: { create: { node: interfaceCreateInput } },
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

export const makeActionCreateInput = (
  action: ICreateActionDTO,
): ICreateActionInput => {
  const actionsOrders = groupActionsOrders(action.actionsIds || [])

  return {
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

    errorAction:
      action.type === IActionKind.ResourceAction && action.errorActionId
        ? {
            ResourceAction: {
              connect: { where: { node: { id: action.errorActionId } } },
            },
          }
        : undefined,

    successAction:
      action.type === IActionKind.ResourceAction && action.successActionId
        ? {
            ResourceAction: {
              connect: { where: { node: { id: action.successActionId } } },
            },
          }
        : undefined,

    actions:
      action.type === IActionKind.PipelineAction
        ? {
            CustomAction: makePipelineActionsCreateInput(actionsOrders),
            PipelineAction: makePipelineActionsCreateInput(actionsOrders),
            ResourceAction: makePipelineActionsCreateInput(actionsOrders),
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
  const actionsOrders = groupActionsOrders(input.actionsIds || [])

  return {
    where: { id: action.id },
    update: {
      name: input.name,
      runOnInit: input.runOnInit,

      resource:
        input.type === IActionKind.ResourceAction
          ? { connect: { where: { node: { id: input.resourceId } } } }
          : undefined,

      config:
        input.type === IActionKind.ResourceAction
          ? { update: { node: { data: JSON.stringify(input.config) } } }
          : undefined,
      errorAction:
        input.type === IActionKind.ResourceAction
          ? {
              ResourceAction: {
                connect: { where: { node: { id: input.errorActionId } } },
              },
            }
          : undefined,
      successAction:
        input.type === IActionKind.ResourceAction
          ? {
              ResourceAction: {
                connect: { where: { node: { id: input.successActionId } } },
              },
            }
          : undefined,

      actions:
        action.type === IActionKind.PipelineAction
          ? {
              CustomAction: makePipelineActionsUpdateInput(actionsOrders),
              PipelineAction: makePipelineActionsUpdateInput(actionsOrders),
              ResourceAction: makePipelineActionsUpdateInput(actionsOrders),
            }
          : undefined,
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
