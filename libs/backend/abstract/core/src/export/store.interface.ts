import type {
  ApiAction,
  CodeAction,
  Store,
} from '@codelab/backend/abstract/codegen'

export type IStoreExport = Omit<Store, 'actions'> & {
  actions: Array<IActionExport>
}

export type IActionExport = ApiAction | CodeAction
