import type { IActionModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteActionModal = () =>
  useModalState<IActionModel>(MODEL_ACTION.DeleteAction.key)
