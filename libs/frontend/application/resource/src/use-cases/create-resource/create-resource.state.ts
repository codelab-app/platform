import type { CreateResourceData } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateResourceModal = () =>
  useModalState<CreateResourceData>(UiKey.CreateResourceModal)

export const useCreateResourceForm = () =>
  useFormState<CreateResourceData>(UiKey.CreateResourceForm)
