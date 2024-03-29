import { ObjectTyped } from 'object-typed'
import { kebabCase } from 'voca'
import { titleCase } from '../utils'
import type { ModelInteraction } from './model.data'
import { modelDataMap } from './model.data'
import type { ModelUiData, ModelUiKey } from './model-ui.types'

type ModelUiDataMap = {
  [Combination in ModelInteraction<'uis'>]: ModelUiData
}

export class ModelUiFactory {
  public modelUis = {} as ModelUiDataMap

  constructor() {
    ObjectTyped.entries(modelDataMap).forEach(([modelName, { uis }]) => {
      uis.forEach((ui) => {
        const sidebarKey = `${ui}${modelName}` as ModelInteraction<'uis'>

        this.modelUis[sidebarKey] = {
          key: kebabCase(sidebarKey) as ModelUiKey,
          title: titleCase(sidebarKey),
        }
      })
    })
  }
}

export const MODEL_UI = new ModelUiFactory().modelUis
