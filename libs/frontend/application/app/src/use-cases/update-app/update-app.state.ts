import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useUpdateAppModal = () =>
  useModalState<IAppModel>(MODEL_ACTION.UpdateApp.key)
