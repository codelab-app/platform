import type { IRef } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useFormState,
  useModalState,
} from '@codelab/frontend-application-shared-store/ui'

export const useCreateFieldForm = () =>
  useFormState<IRef>(UiKey.FieldFormCreate)

export const useCreateFieldModal = () =>
  useModalState<IRef>(UiKey.FieldModalCreate)
