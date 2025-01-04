import type { IStoreModel } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'

export const useCreateActionForm = () =>
  useFormState<IStoreModel>(UiKey.ActionFormCreate)
