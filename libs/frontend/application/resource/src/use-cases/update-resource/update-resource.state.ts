import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdateResourceModal = () =>
  useModalState<Ref<IResourceModel>>(MODEL_ACTION.UpdateResource.key)

export const useUpdateResourceForm = () =>
  useFormState<Ref<IResourceModel>>(MODEL_ACTION.UpdateResource.key)
