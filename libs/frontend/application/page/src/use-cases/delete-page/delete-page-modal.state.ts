import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useDeletePageModal = () =>
  useModalState<Ref<IPageModel>>(MODEL_ACTION.DeletePage.key)
