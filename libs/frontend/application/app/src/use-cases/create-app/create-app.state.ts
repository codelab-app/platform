import type { IModalService } from '@codelab/frontend/abstract/application'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useCreateAppModal = (): IModalService =>
  useModalState(UiKey.AppModalCreate)
