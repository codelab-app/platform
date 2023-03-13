import type {
  IAnyActionWhere,
  IConnectActionInput,
  ICreateActionInput,
  IDeleteActionInput,
  IDisconnectActionInput,
  IUpdateActionInput,
} from '@codelab/frontend/abstract/core'
import { client } from '@codelab/frontend/model/infra/graphql'
import type {
  ActionFragment,
  CodeActionCreateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { UnboxArray } from '@codelab/shared/abstract/types'
import type { Maybe } from 'graphql/jsutils/Maybe'
import type { ArrayOrSingle } from 'ts-essentials'
import { getSdk as getCreateSdk } from '../../graphql/create-action.endpoints.graphql.gen'
import { getSdk as getDeleteSdk } from '../../graphql/delete-action.endpoints.graphql.gen'
import type { GetActionsQuery } from '../../graphql/get-action.endpoints.graphql.gen'
import { getSdk as getGetSdk } from '../../graphql/get-action.endpoints.graphql.gen'
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
    input: Array<ICreateActionInput> | ICreateActionInput,
  ) => Promise<Array<ActionFragment>>
>

type UpdateActionsRecord = Record<
  IActionKind,
  (vars: {
    connect?: IConnectActionInput
    delete?: IDeleteActionInput
    disconnect?: IDisconnectActionInput
    update: IUpdateActionInput
    where: IAnyActionWhere
  }) => Promise<Array<ActionFragment>>
>

type DeleteActionsRecord = Record<
  IActionKind,
  (vars: {
    where: IAnyActionWhere
  }) => Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
>

export const getActionsByStore = async (
  storeId: Maybe<string>,
): GetActionsReturnType => {
  const { apiActions, codeActions } = await getActionApi.GetActions({ storeId })

  return [...codeActions, ...apiActions]
}

export const createActionApi: CreateActions = {
  [IActionKind.CodeAction]: (input) =>
    _createActionApi
      .CreateCodeActions({
        input: input as ArrayOrSingle<CodeActionCreateInput>,
      })
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
    _deleteActionApi
      .DeleteCodeActions(vars)
      .then((results) => results.deleteCodeActions),
  [IActionKind.ApiAction]: (vars) =>
    _deleteActionApi
      .DeleteApiActions(vars)
      .then((results) => results.deleteApiActions),
}
