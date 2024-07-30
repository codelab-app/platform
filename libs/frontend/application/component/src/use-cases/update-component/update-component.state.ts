import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useUpdateComponentModal = () =>
  useModalState<IComponentModel>(MODEL_ACTION.UpdateComponent.key)
