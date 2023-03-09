//
// Utilities for transforming the form inputs to api inputs
//

import type {
  IAnyActionWhere,
  ICreateActionData,
  ICreateActionInput,
  IUpdateActionData,
  IUpdateActionInput,
} from '@codelab/frontend/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

export const makeActionCreateInput = (
  action: ICreateActionData,
): ICreateActionInput => {
  return {
    code: action.type === IActionKind.CodeAction ? action.code : undefined,
    config:
      action.type === IActionKind.ApiAction
        ? {
            create: {
              node: { data: JSON.stringify(action.config || {}), id: v4() },
            },
          }
        : undefined,
    errorAction:
      action.type === IActionKind.ApiAction && action.errorActionId
        ? {
            ApiAction: connectNodeId(action.errorActionId),
            CodeAction: connectNodeId(action.errorActionId),
          }
        : undefined,
    id: v4(),
    name: action.name,
    resource:
      action.type === IActionKind.ApiAction
        ? connectNodeId(action.resourceId)
        : undefined,
    store: connectNodeId(action.storeId),
    successAction:
      action.type === IActionKind.ApiAction && action.successActionId
        ? {
            ApiAction: connectNodeId(action.successActionId),
            CodeAction: connectNodeId(action.successActionId),
          }
        : undefined,
    type: action.type,
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
    update: {
      code: type === IActionKind.CodeAction ? code : undefined,

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
      name: name,
      resource:
        type === IActionKind.ApiAction ? connectNodeId(resourceId) : undefined,

      successAction:
        type === IActionKind.ApiAction
          ? {
              ApiAction: connectNodeId(successActionId),
              CodeAction: connectNodeId(successActionId),
            }
          : undefined,
    },
    where: { id },
  }
}
