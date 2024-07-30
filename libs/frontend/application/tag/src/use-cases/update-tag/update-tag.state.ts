import type { ITagModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useUpdateTagForm = () =>
  useFormState<ITagModel>(MODEL_ACTION.UpdateTag.key)

export const useUpdateTagModal = () =>
  useModalState<ITagModel>(MODEL_ACTION.UpdateTag.key)
