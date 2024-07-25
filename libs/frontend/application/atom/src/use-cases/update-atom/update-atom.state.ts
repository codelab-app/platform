import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdateAtomModal = () =>
  useModalState<Ref<IAtomModel>>(MODEL_ACTION.DeleteAtom.key)

export const useUpdateAtomForm = () =>
  useFormState<Ref<IAtomModel>>(MODEL_ACTION.DeleteAtom.key)
