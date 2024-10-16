import type {
  IFormService,
  IModalService,
} from '@codelab/frontend/abstract/application'
import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateAuthGuardModal = (): IModalService<
  Ref<IAuthGuardModel>
> => useModalState<Ref<IAuthGuardModel>>(UiKey.AuthGuardModalUpdate)

export const useUpdateAuthGuardForm = (): IFormService<Ref<IAuthGuardModel>> =>
  useFormState<Ref<IAuthGuardModel>>(UiKey.AuthGuardFormUpdate)
