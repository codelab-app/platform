import type { IToggleService } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

export const useUpdateAppModal = (): IToggleService<
  IAppModel,
  { app?: IAppModel }
> =>
  useModalState<IAppModel, { app?: IAppModel }>(
    UiKey.UpdateAppModal,
    (data) => ({
      app: data,
    }),
  )
