import type { ApiAction, CodeAction } from '@codelab/backend/abstract/codegen'
import type { IActionExport } from '@codelab/backend/abstract/core'
import {
  exportApiActionSelectionSet,
  exportCodeActionSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'

export const importActions = async (
  actions: Array<IActionExport>,
  storeId: string,
) => {
  if (!actions.length) {
    return
  }

  const CodeAction = await Repository.instance.CodeAction
  const ApiAction = await Repository.instance.ApiAction
  const codeActions: Array<CodeAction> = []
  const apiActions: Array<ApiAction> = []

  for (const action of actions) {
    if (action.type === IActionKind.CodeAction) {
      codeActions.push(action as CodeAction)

      continue
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (action.type === IActionKind.ApiAction) {
      apiActions.push(action as ApiAction)

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
      config: {
        create: { node: { data: action.config.data, id: action.config.id } },
      },
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
    selectionSet: exportCodeActionSelectionSet,
    where: { store: { id: storeId } },
  })

  const apiActions = await ApiAction.find({
    selectionSet: exportApiActionSelectionSet,
    where: { store: { id: storeId } },
  })

  return [...codeActions, ...apiActions]
}
