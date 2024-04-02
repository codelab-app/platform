import { ModelName } from './model.types'
import { ModelAction } from './model-action.types'
import { CuiComponents } from './model-ui.types'

/**
 * For common actions, we use enum. For 1 off's, we use literal
 *
 * We pascal case as the value, but the key uses kebab case. The end result is title case
 */
export const modelDataMap = {
  [ModelName.Action]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.CancelUpdate,
      ModelAction.Delete,
    ],
    uis: [],
  },
  [ModelName.App]: {
    actions: [
      ModelAction.Create,
      ModelAction.Update,
      ModelAction.Delete,
      'Import',
      'Build',
    ],
    uis: [],
  },
  [ModelName.Atom]: {
    actions: [
      ModelAction.CancelCreate,
      ModelAction.Create,
      ModelAction.Update,
      ModelAction.Delete,
    ],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.AuthGuard]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.Delete,
    ],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.Builder]: {
    actions: ['OpenBuilder', 'OpenPreview'],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.Component]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.Delete,
      'Import',
    ],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.Domain]: {
    actions: [ModelAction.Create, ModelAction.Update, ModelAction.Delete],
    uis: [],
  },
  [ModelName.Element]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.Delete,
      'Move',
    ],
    uis: [],
  },
  [ModelName.Field]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.CancelUpdate,
      ModelAction.Delete,
      'SelectDefaultValue',
      'SelectUnionTypeValue',
    ],
    uis: [],
  },
  [ModelName.Lambda]: {
    actions: [ModelAction.Create],
    uis: [],
  },
  [ModelName.Page]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.CancelUpdate,
      ModelAction.Delete,
    ],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.Pagination]: {
    actions: ['PreviousPage', 'CurrentPage', 'NextPage', 'PageSize', 'Search'],
    uis: [],
  },
  [ModelName.Redirect]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.CancelUpdate,
      ModelAction.Delete,
    ],
    uis: [],
  },
  [ModelName.Resource]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.Delete,
    ],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.Admin]: {
    actions: ['ImportData', 'ExportData'],
    uis: [],
  },
  [ModelName.Prop]: {
    actions: [],
    uis: [],
  },
  [ModelName.Tag]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.Delete,
    ],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.Type]: {
    actions: [
      ModelAction.Create,
      ModelAction.CancelCreate,
      ModelAction.Update,
      ModelAction.Delete,
    ],
    uis: [CuiComponents.Sidebar],
  },
  [ModelName.User]: { actions: ['SignOut'], uis: [] },
} as const

export type ModelDataMap = typeof modelDataMap
/**
 * This new approach creates the combination from mapping each key-value pair
 *
 * Previous approach didn't have the correct combinations
 *
 * KebabCase<`${ModelAction}${ModelName}`>
 */
export type ModelInteraction<T extends 'actions' | 'uis'> = {
  [Model in keyof ModelDataMap]: `${ModelDataMap[Model][T][number]}${Model}`
}[keyof ModelDataMap]
