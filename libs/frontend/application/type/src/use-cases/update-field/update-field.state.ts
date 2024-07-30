import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateFieldModal = () =>
  useModalState<IFieldModel>(MODEL_ACTION.UpdateField.key)

export const useUpdateFieldForm = () =>
  useFormState<IFieldModel>(MODEL_ACTION.UpdateField.key)
