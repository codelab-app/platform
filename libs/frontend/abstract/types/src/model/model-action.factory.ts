import { ObjectTyped } from 'object-typed'
import { kebabCase } from 'voca'
import { titleCase } from '../utils'
import type { ModelInteraction } from './model.data'
import { modelDataMap } from './model.data'
import type {
  ModelActionData,
  ModelActionKey,
  ModelActionTitle,
} from './model-action.types'

type ModelActionDataMap = {
  [Combination in ModelInteraction<'actions'>]: ModelActionData
}

class ModelActionSingleton {
  public static getInstance(): ModelActionDataMap {
    if (!ModelActionSingleton.instance) {
      ModelActionSingleton.instance = this.createModelActions()
    }

    return ModelActionSingleton.instance
  }

  private static createModelActions(): ModelActionDataMap {
    const modelActions = {} as ModelActionDataMap

    ObjectTyped.entries(modelDataMap).forEach(([modelName, { actions }]) => {
      actions.forEach((action) => {
        const modelAction =
          `${action}${modelName}` as ModelInteraction<'actions'>

        modelActions[modelAction] = {
          key: kebabCase(modelAction) as ModelActionKey,
          title: titleCase(modelAction) as ModelActionTitle,
        }
      })
    })

    return modelActions
  }

  private static instance: ModelActionDataMap | null = null

  private constructor() {
    //
  }
}

export const MODEL_ACTION = ModelActionSingleton.getInstance()
