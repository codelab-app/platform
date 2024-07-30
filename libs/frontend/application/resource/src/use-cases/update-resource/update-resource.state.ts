import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateResourceModal = () =>
  useModalState<IResourceModel>(MODEL_ACTION.UpdateResource.key)

export const useUpdateResourceForm = () =>
  useFormState<IResourceModel>(MODEL_ACTION.UpdateResource.key)
