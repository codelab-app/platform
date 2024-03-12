import type { TitleCase } from '@codelab/shared/abstract/types'
import type { KebabCase } from 'type-fest'
import { ModelAction } from './model.constant'

/**
 * For common actions, we use enum. For 1 off's, we use literal
 */
export const modelActionMap = {
  Action: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.CancelUpdate,
    ModelAction.Delete,
  ],
  App: [ModelAction.Create, 'Import'],
  Atom: [
    ModelAction.CancelCreate,
    ModelAction.Create,
    ModelAction.Update,
    ModelAction.Delete,
  ],
  AuthGuard: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.Delete,
  ],
  Builder: ['Open', 'TogglePreviewMode'],
  Component: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.Delete,
  ],
  Domain: [ModelAction.Create, ModelAction.Update, ModelAction.Delete],
  Element: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.Delete,
  ],
  Field: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.CancelUpdate,
    ModelAction.Delete,
  ],
  Lambda: [ModelAction.Create],
  Page: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.CancelUpdate,
    ModelAction.Delete,
    'Build',
  ],
  Pagination: ['PreviousPage', 'CurrentPage', 'NextPage', 'PageSize', 'Search'],
  Redirect: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.CancelUpdate,
    ModelAction.Delete,
  ],
  Resource: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.Delete,
  ],
  Tag: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.Delete,
  ],
  Type: [
    ModelAction.Create,
    ModelAction.CancelCreate,
    ModelAction.Update,
    ModelAction.Delete,
  ],
  User: ['SignOut'],
} as const

export type ModelActionMap = typeof modelActionMap

/**
 * This new approach creates the combination from mapping each key-value pair
 *
 * Previous approach didn't have the correct combinations
 *
 * KebabCase<`${ModelAction}${ModelName}`>
 */
export type ActionModelCombinations = {
  [Model in keyof ModelActionMap]: `${ModelActionMap[Model][number]}${Model}`
}[keyof ModelActionMap]

export type ModelActionKey = KebabCase<ActionModelCombinations>

export type ModelActionTitle = TitleCase<ActionModelCombinations>

export interface ModelActionData {
  key: ModelActionKey
  title: ModelActionTitle
}
