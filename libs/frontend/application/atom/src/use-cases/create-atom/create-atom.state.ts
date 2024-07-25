import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateAtomModal = () =>
  useModalState(MODEL_ACTION.CreateAtom.key)

export const useCreateAtomForm = () => useFormState(MODEL_ACTION.CreateAtom.key)
