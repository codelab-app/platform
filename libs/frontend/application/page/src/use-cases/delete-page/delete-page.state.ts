import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeletePageModal = () =>
  useModalState<Ref<IPageModel>>(UiKey.PageModalDelete)
