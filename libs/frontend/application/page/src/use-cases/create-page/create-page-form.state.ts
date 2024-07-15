import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useCreatePageForm = () =>
  useModalState(MODEL_ACTION.CreatePage.key)
