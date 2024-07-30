import type { IActionModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateActionForm = () =>
  useFormState<IActionModel>(MODEL_ACTION.UpdateAction.key)

export const useUpdateActionModal = () =>
  useModalState<IActionModel>(MODEL_ACTION.UpdateAction.key)
