import type {
  IFormService,
  IModalService,
} from '@codelab/frontend/abstract/application'
import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdateAuthGuardModal = (): IModalService<
  Ref<IAuthGuardModel>
> =>
  useModalState<Ref<IAuthGuardModel>, { authGuard: IAuthGuardModel }>(
    MODEL_ACTION.UpdateAuthGuard.key,
  )

export const useUpdateAuthGuardForm = (): IFormService =>
  useFormState<IAuthGuardModel>(MODEL_ACTION.UpdateAuthGuard.key)
