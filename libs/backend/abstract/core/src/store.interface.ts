import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export type IStoreExport = Omit<OGM_TYPES.Store, 'actions'> & {
  actions: Array<IActionExport>
}

export type IActionExport = OGM_TYPES.ApiAction | OGM_TYPES.CodeAction
