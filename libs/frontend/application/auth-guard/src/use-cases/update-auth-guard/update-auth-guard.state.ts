import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateAuthGuardModal = () =>
  useModalState<IAuthGuardModel>(MODEL_ACTION.UpdateAuthGuard.key)

export const useUpdateAuthGuardForm = () =>
  useFormState<IAuthGuardModel>(MODEL_ACTION.UpdateAuthGuard.key)
