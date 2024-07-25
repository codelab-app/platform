import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdatePageForm = () =>
  useFormState<Ref<IPageModel>>(MODEL_ACTION.UpdatePage.key)
