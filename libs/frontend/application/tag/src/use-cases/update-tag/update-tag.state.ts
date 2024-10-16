import type { ITagModel } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateTagForm = () =>
  useFormState<ITagModel>(UiKey.TagFormUpdate)

export const useUpdateTagModal = () =>
  useModalState<ITagModel>(UiKey.TagModalUpdate)
