import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateAuthGuardModal = () =>
  useModalState(UiKey.AuthGuardModalCreate)

export const useCreateAuthGuardForm = () =>
  useFormState(UiKey.AuthGuardFormCreate)
