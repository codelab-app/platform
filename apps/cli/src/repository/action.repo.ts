import {
  CustomActionOGM,
  customActionSelectionSet,
  ResourceActionOGM,
} from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IActionExport, IActionKind } from '@codelab/shared/abstract/core'
import { exportResourceActionSelectionSet } from '../selectionSets/actionSelectionSet'

export const importActions = async (
  actions: Array<IActionExport>,
  storeId: string,
) => {
  const CustomAction = await CustomActionOGM()
  const ResourceAction = await ResourceActionOGM()
  const customActions: Array<OGM_TYPES.CustomAction> = []
  const resourceActions: Array<OGM_TYPES.ResourceAction> = []

  for (const action of actions) {
    if (action.type === IActionKind.CustomAction) {
      customActions.push(action as OGM_TYPES.CustomAction)
    } else if (action.type === IActionKind.ResourceAction) {
      resourceActions.push(action as OGM_TYPES.ResourceAction)
    } else {
      throw new Error(`Unknown action type : ${action.type}`)
    }
  }

  console.log('Creating CustomActions...')

  await CustomAction.create({
    input: customActions.map((action) => ({
      code: action.code,
      id: action.id,
      name: action.name,
      type: action.type,
      store: { connect: { where: { node: { id: storeId } } } },
    })),
  })

  console.log('Creating ResourceActions...')

  await ResourceAction.create({
    input: resourceActions.map((action) => ({
      resource: { connect: { where: { node: { id: action.resource.id } } } },
      id: action.id,
      name: action.name,
      type: action.type,
      config: { create: { node: { data: action.config.data } } },
      store: { connect: { where: { node: { id: storeId } } } },
    })),
  })

  console.log('Updating ResourceActions...')

  for (const r of resourceActions) {
    await ResourceAction.update({
      where: { id: r.id },
      update: {
        errorAction: {
          ResourceAction: {
            connect: { where: { node: { id: r.errorAction.id } } },
          },
        },
        successAction: {
          ResourceAction: {
            connect: { where: { node: { id: r.successAction.id } } },
          },
        },
      },
    })
  }
}

export const exportActions = async (
  storeId: string,
): Promise<Array<IActionExport>> => {
  const CustomAction = await CustomActionOGM()
  const ResourceAction = await ResourceActionOGM()

  const customActions = await CustomAction.find({
    where: { store: { id: storeId } },
    selectionSet: customActionSelectionSet,
  })

  const resourceActions = await ResourceAction.find({
    where: { store: { id: storeId } },
    selectionSet: exportResourceActionSelectionSet,
  })

  return [...customActions, ...resourceActions]
}
