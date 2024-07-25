import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateAuthGuardModal = () =>
  useModalState(MODEL_ACTION.CreateAuthGuard.key)

export const useCreateAuthGuardForm = () =>
  useFormState(MODEL_ACTION.CreateAuthGuard.key)
