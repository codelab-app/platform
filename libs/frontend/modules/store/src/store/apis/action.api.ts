import { client } from '@codelab/frontend/model/infra/graphql'
import {
  IActionDTO,
  IActionKind,
  IAnyActionWhere,
  IConnectActionInput,
  ICreateActionInput,
  IDeleteActionInput,
  IDisconnectActionInput,
  IUpdateActionInput,
} from '@codelab/shared/abstract/core'
import { UnboxArray } from '@codelab/shared/abstract/types'
import { Maybe } from 'graphql/jsutils/Maybe'
import { flatten } from 'lodash'
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
  [IActionKind.CustomAction]: (input) =>
    _createActionApi
      .CreateCustomActions({ input: input as any })
      .then((response) => response.createCustomActions.customActions),

  [IActionKind.ResourceAction]: (input) =>
    _createActionApi
      .CreateResourceActions({ input })
      .then((response) => response.createResourceActions.resourceActions),

  [IActionKind.PipelineAction]: (input) =>
    _createActionApi
      .CreatePipelineActions({ input })
      .then((response) => response.createPipelineActions.pipelineActions),
}

export const updateActionApi: UpdateActionsRecord = {
  [IActionKind.CustomAction]: (vars) =>
    _updateActionApi
      .UpdateCustomActions(vars)
      .then((response) => response.updateCustomActions.customActions),

  [IActionKind.ResourceAction]: (vars) =>
    _updateActionApi
      .UpdateResourceActions(vars)
      .then((response) => response.updateResourceActions.resourceActions),

  [IActionKind.PipelineAction]: (vars) =>
    _updateActionApi
      .UpdatePipelineActions(vars)
      .then((response) => response.updatePipelineActions.pipelineActions),
}

export const deleteActionApi: DeleteActionsRecord = {
  [IActionKind.CustomAction]: (vars) =>
    _deleteActionApi
      .DeleteCustomActions(vars)
      .then((r) => r.deleteCustomActions),
  [IActionKind.ResourceAction]: (vars) =>
    _deleteActionApi
      .DeleteResourceActions(vars)
      .then((r) => r.deleteResourceActions),
  [IActionKind.PipelineAction]: (vars) =>
    _deleteActionApi
      .DeletePipelineActions(vars)
      .then((r) => r.deletePipelineActions),
}
