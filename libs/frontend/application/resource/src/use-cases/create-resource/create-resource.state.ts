import type { CreateResourceData } from '@codelab/frontend/abstract/application'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateResourceModal = () =>
  useModalState<CreateResourceData>(MODEL_ACTION.CreateResource.key)

export const useCreateResourceForm = () =>
  useFormState<CreateResourceData>(MODEL_ACTION.CreateResource.key)
