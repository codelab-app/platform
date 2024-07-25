import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'

export const useCreateComponentForm = () =>
  useFormState(MODEL_ACTION.CreateComponent.key)
