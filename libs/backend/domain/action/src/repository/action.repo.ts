import type { IActionExport } from '@codelab/backend/abstract/core'
import {
  codeActionSelectionSet,
  exportApiActionSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'

export const importActions = async (
  actions: Array<IActionExport>,
  storeId: string,
) => {
  const CodeAction = await Repository.instance.CodeAction
  const ApiAction = await Repository.instance.ApiAction
  const codeActions: Array<OGM_TYPES.CodeAction> = []
  const apiActions: Array<OGM_TYPES.ApiAction> = []

  for (const action of actions) {
    if (action.type === IActionKind.CodeAction) {
      codeActions.push(action as OGM_TYPES.CodeAction)

      continue
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (action.type === IActionKind.ApiAction) {
      apiActions.push(action as OGM_TYPES.ApiAction)

      continue
    }

    throw new Error(`Unknown action type : ${action.type}`)
  }

  console.log('Creating CodeActions...')

  await CodeAction.create({
    input: codeActions.map((action) => ({
      code: action.code,
      id: action.id,
      name: action.name,
      store: connectNodeId(storeId),
      type: action.type,
    })),
  })

  console.log('Creating ApiActions...')

  await ApiAction.create({
    input: apiActions.map((action) => ({
      config: { create: { node: { data: action.config.data } } },
      errorAction: {
        ApiAction: connectNodeId(action.errorAction?.id),
        CodeAction: connectNodeId(action.errorAction?.id),
      },
      id: action.id,
      name: action.name,
      resource: connectNodeId(action.resource.id),
      store: connectNodeId(storeId),
      successAction: {
        ApiAction: connectNodeId(action.successAction?.id),
        CodeAction: connectNodeId(action.successAction?.id),
      },
      type: action.type,
    })),
  })

  console.log('Updating ApiActions...')

  for (const action of apiActions) {
    await ApiAction.update({
      update: {
        errorAction: {
          ApiAction: connectNodeId(action.errorAction?.id),
        },
        successAction: {
          ApiAction: connectNodeId(action.successAction?.id),
        },
      },
      where: { id: action.id },
    })
  }
}

export const exportActions = async (
  storeId: string,
): Promise<Array<IActionExport>> => {
  const CodeAction = await Repository.instance.CodeAction
  const ApiAction = await Repository.instance.ApiAction

  const codeActions = await CodeAction.find({
    selectionSet: codeActionSelectionSet,
    where: { store: { id: storeId } },
  })

  const apiActions = await ApiAction.find({
    selectionSet: exportApiActionSelectionSet,
    where: { store: { id: storeId } },
  })

  return [...codeActions, ...apiActions]
}
