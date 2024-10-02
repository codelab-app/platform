import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateTagModal = () => useModalState(UiKey.TagModalCreate)

export const useCreateTagForm = () => useFormState(UiKey.TagFormCreate)
