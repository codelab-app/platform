import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteResourceModal = () =>
  useModalState<IResourceModel>(MODEL_ACTION.DeleteResource.key)
