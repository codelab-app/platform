import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateActionForm = () =>
  useFormState<IStoreModel>(MODEL_ACTION.CreateAction.key)

export const useCreateActionModal = () =>
  useModalState<IStoreModel>(MODEL_ACTION.CreateAction.key)
