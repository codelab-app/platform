import type { ITagModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteTagsModal = () =>
  useModalState<Array<ITagModel>>(MODEL_ACTION.DeleteTag.key)
