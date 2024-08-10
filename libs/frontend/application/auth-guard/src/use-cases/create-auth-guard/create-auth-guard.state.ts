import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateAuthGuardModal = () =>
  useModalState(UiKey.CreateAuthGuardModal)

export const useCreateAuthGuardForm = () =>
  useFormState(UiKey.CreateAuthGuardForm)
