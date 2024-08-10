import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdateAtomModal = () =>
  useModalState<Ref<IAtomModel>>(UiKey.UpdateAtomModal)

export const useUpdateAtomForm = () =>
  useFormState<Ref<IAtomModel>>(UiKey.UpdateAtomForm)
