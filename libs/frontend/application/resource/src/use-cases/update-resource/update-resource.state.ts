import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateResourceModal = () =>
  useModalState<IResourceModel>(UiKey.UpdateResourceModal)

export const useUpdateResourceForm = () =>
  useFormState<IResourceModel>(UiKey.UpdateResourceForm)
