import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdatePageForm = () =>
  useFormState<Ref<IPageModel>>(UiKey.UpdatePageForm)
