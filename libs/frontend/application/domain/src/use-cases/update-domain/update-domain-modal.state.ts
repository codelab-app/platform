import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useUpdateDomainModal = () =>
  useModalState(MODEL_ACTION.UpdateDomain.key)
