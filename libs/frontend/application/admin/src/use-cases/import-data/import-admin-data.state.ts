import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useImportAdminDataModal = () =>
  useModalState(UiKey.AdminDataModalImport)
