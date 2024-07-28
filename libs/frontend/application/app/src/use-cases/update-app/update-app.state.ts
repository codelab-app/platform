import type { IToggleService } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'
import type { Ref } from 'mobx-keystone'

export const useUpdateAppModal = (): IToggleService<
  Ref<IAppModel>,
  { app?: IAppModel }
> =>
  useModalState<Ref<IAppModel>, { app?: IAppModel }>(MODEL_ACTION.UpdateApp.key)
