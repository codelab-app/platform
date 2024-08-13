import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useDeleteAtomsModal = () =>
  useModalState<Array<Ref<IAtomModel>>>(UiKey.DeleteAtomsModal)
