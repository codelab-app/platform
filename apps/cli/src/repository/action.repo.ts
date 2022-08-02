import {
  CustomActionOGM,
  PipelineActionOGM,
  ResourceActionOGM,
} from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IActionExport, IActionKind } from '@codelab/shared/abstract/core'

export const importActions = async (
  actions: Array<IActionExport>,
  storeId: string,
) => {
  const CustomAction = await CustomActionOGM()
  const ResourceAction = await ResourceActionOGM()
  const PipelineAction = await PipelineActionOGM()
  const customActions: Array<OGM_TYPES.CustomAction> = []
  const resourceActions: Array<OGM_TYPES.ResourceAction> = []
  const pipelineActions: Array<OGM_TYPES.PipelineAction> = []

  for (const action of actions) {
    if (action.type === IActionKind.CustomAction) {
      customActions.push(action as OGM_TYPES.CustomAction)
    } else if (action.type === IActionKind.PipelineAction) {
      pipelineActions.push(action as OGM_TYPES.PipelineAction)
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
      runOnInit: action.runOnInit,
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
      runOnInit: action.runOnInit,
      type: action.type,
      config: { create: { node: { data: action.config.data } } },
      store: { connect: { where: { node: { id: storeId } } } },
    })),
  })

  console.log('Creating PipelineActions...')

  await PipelineAction.create({
    input: pipelineActions.map((action) => ({
      id: action.id,
      name: action.name,
      runOnInit: action.runOnInit,
      type: action.type,
      store: { connect: { where: { node: { id: storeId } } } },
    })),
  })

  console.log('Updating ResourceActions...')

  for (const r of resourceActions) {
    await ResourceAction.update({
      where: { id: r.id },
      update: {
        errorAction: { connect: { where: { node: { id: r.errorAction.id } } } },
        successAction: {
          connect: { where: { node: { id: r.successAction.id } } },
        },
      },
    })
  }

  console.log('Updating PipelineActions...')

  for (const p of pipelineActions) {
    await PipelineAction.update({
      where: { id: p.id },
      update: {
        actions: {
          CustomAction: [
            {
              connect: p.actionsConnection.edges.map((e) => ({
                where: { node: { id: e.node.id } },
                edge: { orders: e.orders },
              })),
            },
          ],
          ResourceAction: [
            {
              connect: p.actionsConnection.edges.map((e) => ({
                where: { node: { id: e.node.id } },
                edge: { orders: e.orders },
              })),
            },
          ],
          PipelineAction: [
            {
              connect: p.actionsConnection.edges.map((e) => ({
                where: { node: { id: e.node.id } },
                edge: { orders: e.orders },
              })),
            },
          ],
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
  const PipelineAction = await PipelineActionOGM()

  const customActions = await CustomAction.find({
    where: { store: { id: storeId } },
  })

  const resourceActions = await ResourceAction.find({
    where: { store: { id: storeId } },
  })

  const pipelineActions = await PipelineAction.find({
    where: { store: { id: storeId } },
  })

  return [...customActions, ...pipelineActions, ...resourceActions]
}
