import {
  IActionDTO,
  IAnyActionWhere,
  IConnectActionInput,
  ICreateActionInput,
  IDeleteActionInput,
  IDisconnectActionInput,
  IUpdateActionInput,
} from '@codelab/frontend/abstract/core'
import { client } from '@codelab/frontend/model/infra/graphql'
import { IActionKind } from '@codelab/shared/abstract/core'
import { UnboxArray } from '@codelab/shared/abstract/types'
import { Maybe } from 'graphql/jsutils/Maybe'
import flatten from 'lodash/flatten'
import { getSdk as getCreateSdk } from '../../graphql/create-action.endpoints.graphql.gen'
import { getSdk as getDeleteSdk } from '../../graphql/delete-action.endpoints.graphql.gen'
import {
  GetActionsQuery,
  getSdk as getGetSdk,
} from '../../graphql/get-action.endpoints.graphql.gen'
import { getSdk as getUpdateSdk } from '../../graphql/update-action.endpoints.graphql.gen'

export const getActionApi = getGetSdk(client)

const _createActionApi = getCreateSdk(client)
const _deleteActionApi = getDeleteSdk(client)
const _updateActionApi = getUpdateSdk(client)

type GetActionsReturnType = Promise<
  Array<UnboxArray<GetActionsQuery[keyof GetActionsQuery]>>
>

type CreateActions = Record<
  IActionKind,
  (
    input: ICreateActionInput | Array<ICreateActionInput>,
  ) => Promise<Array<IActionDTO>>
>

type UpdateActionsRecord = Record<
  IActionKind,
  (vars: {
    where: IAnyActionWhere
    update: IUpdateActionInput
    delete?: IDeleteActionInput
    disconnect?: IDisconnectActionInput
    connect?: IConnectActionInput
  }) => Promise<Array<IActionDTO>>
>

type DeleteActionsRecord = Record<
  IActionKind,
  (vars: {
    where: IAnyActionWhere
  }) => Promise<{ relationshipsDeleted: number; nodesDeleted: number }>
>

export const getActionsByStore = async (
  storeId: Maybe<string>,
): GetActionsReturnType => {
  const result = await getActionApi.GetActions({ storeId })

  return flatten(Object.values(result) as any)
}

export const createActionApi: CreateActions = {
  [IActionKind.CodeAction]: (input) =>
    _createActionApi
      .CreateCodeActions({ input: input as any })
      .then((response) => response.createCodeActions.codeActions),

  [IActionKind.ApiAction]: (input) =>
    _createActionApi
      .CreateApiActions({ input })
      .then((response) => response.createApiActions.apiActions),
}

export const updateActionApi: UpdateActionsRecord = {
  [IActionKind.CodeAction]: (vars) =>
    _updateActionApi
      .UpdateCodeActions(vars)
      .then((response) => response.updateCodeActions.codeActions),

  [IActionKind.ApiAction]: (vars) =>
    _updateActionApi
      .UpdateApiActions(vars)
      .then((response) => response.updateApiActions.apiActions),
}

export const deleteActionApi: DeleteActionsRecord = {
  [IActionKind.CodeAction]: (vars) =>
    _deleteActionApi.DeleteCodeActions(vars).then((r) => r.deleteCodeActions),
  [IActionKind.ApiAction]: (vars) =>
    _deleteActionApi.DeleteApiActions(vars).then((r) => r.deleteApiActions),
}
