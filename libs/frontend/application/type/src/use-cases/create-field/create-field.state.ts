import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateFieldForm = () =>
  useFormState<IInterfaceTypeModel>(MODEL_ACTION.CreateField.key)

export const useCreateFieldModal = () =>
  useModalState<IInterfaceTypeModel>(MODEL_ACTION.CreateField.key)
