import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useExportAdminDataModal = () =>
  useModalState(MODEL_ACTION.ExportDataAdmin.key)
