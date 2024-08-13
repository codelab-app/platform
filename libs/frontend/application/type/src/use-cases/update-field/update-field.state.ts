import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateFieldModal = () =>
  useModalState<IFieldModel>(UiKey.UpdateFieldModal)

export const useUpdateFieldForm = () =>
  useFormState<IFieldModel>(UiKey.UpdateFieldForm)
