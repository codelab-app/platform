import type { IModalService } from '@codelab/frontend/abstract/application'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useCreateAppModal = (): IModalService =>
  useModalState(MODEL_ACTION.CreateApp.key)
