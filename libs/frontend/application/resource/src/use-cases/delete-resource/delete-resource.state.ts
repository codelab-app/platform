import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteResourceModal = () =>
  useModalState<IResourceModel>(UiKey.DeleteResourceModal)
