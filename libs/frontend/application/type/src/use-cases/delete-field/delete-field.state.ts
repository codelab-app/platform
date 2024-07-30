import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteFieldModal = () =>
  useModalState<IFieldModel>(MODEL_ACTION.DeleteField.key)
