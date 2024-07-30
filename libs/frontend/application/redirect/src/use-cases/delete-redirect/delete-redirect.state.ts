import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'
import type { IRef } from '@codelab/shared/abstract/core'

export const useDeleteRedirectModal = () =>
  useModalState<IRef>(MODEL_ACTION.DeleteRedirect.key)
