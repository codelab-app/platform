import type { IActionModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateActionForm = () =>
  useFormState<IActionModel>(UiKey.UpdateActionForm)

export const useUpdateActionModal = () =>
  useModalState<IActionModel>(UiKey.UpdateActionModal)
