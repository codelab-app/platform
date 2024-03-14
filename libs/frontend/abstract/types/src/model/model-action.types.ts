import type { TitleCase } from '@codelab/shared/abstract/types'
import type { KebabCase } from 'type-fest'
import type { ModelInteraction } from './model.data'

export type ModelActionKey = KebabCase<ModelInteraction<'actions'>>

export type ModelActionTitle = TitleCase<ModelInteraction<'actions'>>

export interface ModelActionData {
  key: ModelActionKey
  title: ModelActionTitle
}

export enum ModelAction {
  Create = 'Create',
  CancelCreate = 'CancelCreate',
  Update = 'Update',
  CancelUpdate = 'CancelUpdate',
  Delete = 'Delete',
}
