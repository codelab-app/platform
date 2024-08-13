import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateAtomModal = () => useModalState(UiKey.CreateAtomModal)

export const useCreateAtomForm = () => useFormState(UiKey.CreateAtomForm)
