import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateTagModal = () => useModalState(MODEL_ACTION.CreateTag.key)

export const useCreateTagForm = () => useFormState(MODEL_ACTION.CreateTag.key)
