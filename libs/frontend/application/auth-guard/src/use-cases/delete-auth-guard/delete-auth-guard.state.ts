import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteAuthGuardModal = () =>
  useModalState<Ref<IAuthGuardModel>>(UiKey.AuthGuardModalDelete)
