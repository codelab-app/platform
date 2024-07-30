import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateTypeForm = () =>
  useFormState<ITypeModel>(MODEL_ACTION.UpdateType.key)

export const useUpdateTypeModal = () =>
  useModalState<ITypeModel>(MODEL_ACTION.UpdateType.key)
