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
  ICreateStoreDTO,
  IUpdateActionDTO,
  IUpdateStoreDTO,
} from '@codelab/shared/abstract/core'
import { capitalize } from 'lodash'
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

export const makeActionUpdateInput = (
  action: IAnyAction,
  input: IUpdateActionDTO,
) => ({
  where: { id: action.id },
  update: {
    name: input.name,
    runOnInit: input.runOnInit,

    resource:
      input.type === IActionKind.ResourceAction
        ? {
            disconnect: {},
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

    actions:
      input.type === IActionKind.PipelineAction
        ? input.actionsIds?.map((actionId) => ({
            disconnect: [{ where: {} }],
            connect: [{ where: { node: { id: actionId } } }],
          }))
        : undefined,

    code: input.type === IActionKind.CustomAction ? input.code : undefined,
  },
})
