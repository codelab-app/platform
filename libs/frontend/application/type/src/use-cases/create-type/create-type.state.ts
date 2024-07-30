import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateTypeModal = () =>
  useModalState(MODEL_ACTION.CreateType.key)

export const useCreateTypeForm = () => useFormState(MODEL_ACTION.CreateType.key)
