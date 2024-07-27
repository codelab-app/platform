import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useDeleteFieldModal = () =>
  useFormState<Ref<IInterfaceTypeModel>>(MODEL_ACTION.DeleteField.key)
