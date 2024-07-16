import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdatePageForm = () =>
  useModalState<Ref<IPageModel>>(MODEL_ACTION.UpdatePage.key)
