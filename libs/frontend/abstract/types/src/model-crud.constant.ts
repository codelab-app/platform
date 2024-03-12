import { Crud, Model } from '@codelab/shared/abstract/core'
import type { TitleCase } from '@codelab/shared/abstract/types'
import type { KebabCase, Replace } from 'type-fest'
import { kebabCase, titleCase } from 'voca'

export type ModelCrudKey = KebabCase<`${Crud}${Model}`>

export type ModelCrudTitle = TitleCase<KebabCase<`${Crud}${Model}`>>

interface ModelCrudData {
  key: ModelCrudKey
  title: ModelCrudTitle
}

export class ModelCrud {
  public models: { [modelKey in Model]: { [crudKey in Crud]: ModelCrudData } }

  constructor() {
    // Initialize the models object properly
    this.models = Object.values(Model).reduce((acc, model) => {
      acc[model] = this.generateCrudForModel(model)

      return acc
    }, {} as { [modelKey in Model]: { [crudKey in Crud]: ModelCrudData } })
  }

  private generateCrudForModel(model: Model): {
    [crudKey in Crud]: ModelCrudData
  } {
    // Initialize the crudActions object properly
    return Object.values(Crud).reduce((acc, crud) => {
      acc[crud] = this.generateKeyTitle(model, crud)

      return acc
    }, {} as { [crudKey in Crud]: ModelCrudData })
  }

  private generateKeyTitle(modelName: Model, modelAction: Crud): ModelCrudData {
    const action = `${modelAction} ${modelName}`

    return {
      key: kebabCase(action) as ModelCrudKey,
      title: titleCase(action) as ModelCrudTitle,
    }
  }
}

export const MODEL_CRUD = new ModelCrud()
