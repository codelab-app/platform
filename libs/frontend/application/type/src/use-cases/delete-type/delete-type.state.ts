import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useDeleteTypeModal = () =>
  useModalState<ITypeModel>(MODEL_ACTION.DeleteType.key)
