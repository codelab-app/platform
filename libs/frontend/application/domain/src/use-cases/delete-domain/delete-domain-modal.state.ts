import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteDomainModal = () =>
  useModalState<IDomainModel>(MODEL_ACTION.DeleteDomain.key)
