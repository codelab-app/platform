import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateFieldForm = () =>
  useFormState<IInterfaceTypeModel>(UiKey.CreateFieldForm)

export const useCreateFieldModal = () =>
  useModalState<IInterfaceTypeModel>(UiKey.CreateFieldModal)
