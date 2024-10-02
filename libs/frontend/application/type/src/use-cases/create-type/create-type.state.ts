import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateTypeModal = () => useModalState(UiKey.TypeModalCreate)

export const useCreateTypeForm = () => useFormState(UiKey.TypeFormCreate)
