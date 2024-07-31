import type { IRedirectModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteRedirectModal = () =>
  useModalState<IRedirectModel>(MODEL_ACTION.DeleteRedirect.key)
