import type { ITagModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteTagsModal = () =>
  useModalState<Array<ITagModel>>(UiKey.DeleteTagModal)
