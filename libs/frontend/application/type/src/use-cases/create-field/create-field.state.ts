import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useCreateFieldForm = () =>
  useFormState<Ref<IInterfaceTypeModel>>(MODEL_ACTION.CreateField.key)

export const useCreateFieldModal = () =>
  useModalState<Ref<IInterfaceTypeModel>>(MODEL_ACTION.CreateField.key)
