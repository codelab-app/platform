import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'
import type { IAppDto } from '@codelab/shared/abstract/core'

export const useDeleteAppModal = () =>
  useModalState<IAppDto>(MODEL_ACTION.DeleteApp.key)
