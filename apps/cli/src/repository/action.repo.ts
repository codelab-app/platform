import {
  ApiActionOGM,
  CodeActionOGM,
  codeActionSelectionSet,
} from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IActionExport, IActionKind } from '@codelab/shared/abstract/core'
import { connectNode } from '@codelab/shared/data'
import { exportApiActionSelectionSet } from '../selectionSets/actionSelectionSet'

export const importActions = async (
  actions: Array<IActionExport>,
  storeId: string,
) => {
  const CodeAction = await CodeActionOGM()
  const ApiAction = await ApiActionOGM()
  const codeActions: Array<OGM_TYPES.CodeAction> = []
  const apiActions: Array<OGM_TYPES.ApiAction> = []

  for (const action of actions) {
    if (action.type === IActionKind.CodeAction) {
      codeActions.push(action as OGM_TYPES.CodeAction)
    } else if (action.type === IActionKind.ApiAction) {
      apiActions.push(action as OGM_TYPES.ApiAction)
    } else {
      throw new Error(`Unknown action type : ${action.type}`)
    }
  }

  console.log('Creating CodeActions...')

  await CodeAction.create({
    input: codeActions.map((action) => ({
      code: action.code,
      id: action.id,
      name: action.name,
      type: action.type,
      store: connectNode(storeId),
    })),
  })

  console.log('Creating ApiActions...')

  await ApiAction.create({
    input: apiActions.map((action) => ({
      resource: connectNode(action.resource.id),
      id: action.id,
      name: action.name,
      type: action.type,
      config: { create: { node: { data: action.config.data } } },
      store: connectNode(storeId),
    })),
  })

  console.log('Updating ApiActions...')

  for (const r of apiActions) {
    await ApiAction.update({
      where: { id: r.id },
      update: {
        errorAction: {
          ApiAction: connectNode(r.errorAction.id),
        },
        successAction: {
          ApiAction: connectNode(r.successAction.id),
        },
      },
    })
  }
}

export const exportActions = async (
  storeId: string,
): Promise<Array<IActionExport>> => {
  const CodeAction = await CodeActionOGM()
  const ApiAction = await ApiActionOGM()

  const codeActions = await CodeAction.find({
    where: { store: { id: storeId } },
    selectionSet: codeActionSelectionSet,
  })

  const apiActions = await ApiAction.find({
    where: { store: { id: storeId } },
    selectionSet: exportApiActionSelectionSet,
  })

  return [...codeActions, ...apiActions]
}
