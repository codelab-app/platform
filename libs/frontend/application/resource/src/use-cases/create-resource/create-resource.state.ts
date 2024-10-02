import type { CreateResourceData } from '@codelab/frontend/abstract/application'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateResourceModal = () =>
  useModalState<CreateResourceData>(UiKey.ResourceModalCreate)

export const useCreateResourceForm = () =>
  useFormState<CreateResourceData>(UiKey.ResourceFormCreate)
