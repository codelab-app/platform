import type {
  IFormService,
  IModalService,
} from '@codelab/frontend/abstract/application'
import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdateAuthGuardModal = (): IModalService<
  Ref<IAuthGuardModel>
> => useModalState<Ref<IAuthGuardModel>>(UiKey.UpdateAuthGuardModal)

export const useUpdateAuthGuardForm = (): IFormService<Ref<IAuthGuardModel>> =>
  useFormState<Ref<IAuthGuardModel>>(UiKey.UpdateAuthGuardForm)
