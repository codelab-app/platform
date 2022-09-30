import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export type IStoreExport = Omit<OGM_TYPES.Store, 'actions'> & {
  actions: Array<IActionExport>
}

export type IActionExport = OGM_TYPES.CodeAction | OGM_TYPES.ApiAction
