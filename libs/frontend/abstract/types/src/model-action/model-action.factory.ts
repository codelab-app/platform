import { ObjectTyped } from 'object-typed'
import voca, { kebabCase } from 'voca'
import type {
  ActionModelCombinations,
  ModelActionData,
  ModelActionKey,
  ModelActionTitle,
} from './model-action.constant'
import { modelActionMap } from './model-action.constant'

type ModelActionDataMap = {
  [Combination in ActionModelCombinations]: ModelActionData
}

export class ModelActionFactory {
  public models = {} as ModelActionDataMap

  constructor() {
    ObjectTyped.entries(modelActionMap).forEach(([modelName, actions]) => {
      // For each action associated with this model, generate and assign its data.
      actions.forEach((action) => {
        // Form the combination string according to ActionModelCombinations type.
        const combination = `${action}${modelName}` as ActionModelCombinations

        // Populate 'models' with data for each combination.
        this.models[combination] = this.generateKeyTitle(modelName, action)
      })
    })
  }

  private generateKeyTitle(
    modelName: keyof typeof modelActionMap,
    action: (typeof modelActionMap)[keyof typeof modelActionMap][number],
  ): ModelActionData {
    const modelAction = `${action}${modelName}`

    return {
      key: kebabCase(modelAction) as ModelActionKey,
      title: this.titleCase(modelAction) as ModelActionTitle,
    }
  }

  /**
   * Moved here so we don't get circular dep
   */
  private titleCase = (input: string) => {
    // This regex will insert a space before any uppercase letter that
    // follows a lowercase letter, effectively splitting camelCase and PascalCase words.
    const withSpaces = input.replace(/([a-z])([A-Z])/g, '$1 $2')

    return voca.titleCase(withSpaces)
  }
}

export const MODEL_ACTION = new ModelActionFactory().models
