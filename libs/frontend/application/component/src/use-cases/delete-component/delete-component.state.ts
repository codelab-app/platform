import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteComponentModal = () =>
  useModalState<IComponentModel>(UiKey.DeleteComponentModal)
