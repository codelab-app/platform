import type { IResourceModel } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateResourceModal = () =>
  useModalState<IResourceModel>(UiKey.ResourceModalUpdate)

export const useUpdateResourceForm = () =>
  useFormState<IResourceModel>(UiKey.ResourceFormUpdate)
