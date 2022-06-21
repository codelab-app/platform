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
    if (action.__typename === IActionKind.CustomAction) {
      customActions.push(action)
    } else if (action.__typename === IActionKind.PipelineAction) {
      pipelineActions.push(action)
    } else if (action.__typename === IActionKind.ResourceAction) {
      resourceActions.push(action)
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
        error: { connect: { where: { node: { id: r.error.id } } } },
        success: { connect: { where: { node: { id: r.success.id } } } },
      },
    })
  }

  console.log('Updating PipelineActions...')

  for (const p of pipelineActions) {
    await PipelineAction.update({
      where: { id: p.id },
      update: {
        actions: [
          { connect: p.actions.map(({ id }) => ({ where: { node: { id } } })) },
        ],
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

  return {
    ...customActions,
    ...pipelineActions,
    ...resourceActions,
  }
}
