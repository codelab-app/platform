import { ObjectTyped } from 'object-typed'
import voca, { kebabCase } from 'voca'
import { titleCase } from '../utils'
import type { ModelDataMap, ModelInteraction } from './model.data'
import { modelDataMap } from './model.data'
import type {
  ModelActionData,
  ModelActionKey,
  ModelActionTitle,
} from './model-action.types'

type ModelActionDataMap = {
  [Combination in ModelInteraction<'actions'>]: ModelActionData
}

export class ModelActionFactory {
  public modelActions = {} as ModelActionDataMap

  constructor() {
    ObjectTyped.entries(modelDataMap).forEach(([modelName, { actions }]) => {
      // For each action associated with this model, generate and assign its data.
      actions.forEach((action) => {
        // Form the combination string according to ActionModelCombinations type.
        const modelAction =
          `${action}${modelName}` as ModelInteraction<'actions'>

        this.modelActions[modelAction] = {
          key: kebabCase(modelAction) as ModelActionKey,
          title: titleCase(modelAction) as ModelActionTitle,
        }
      })
    })
  }
}

export const MODEL_ACTION = new ModelActionFactory().modelActions
