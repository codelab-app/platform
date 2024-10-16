import { UiKey } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'

export const useCreateComponentForm = () =>
  useFormState(UiKey.ComponentFormCreate)
